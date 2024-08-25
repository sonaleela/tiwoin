import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnDestroy, Output, forwardRef, inject } from '@angular/core';
import { CloseScrollStrategy, OverlayModule } from '@angular/cdk/overlay';
import { CdkListboxModule, ListboxValueChangeEvent } from '@angular/cdk/listbox';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SluiIconModule } from '@sonaleela/ui';
import { Store } from '@ngrx/store';

import { LoadingModule } from '../loading/loading.module';
import * as fromRootStore from "@store";
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-select-employee',
    standalone: true,
    imports: [
        CommonModule,
        OverlayModule,
        CdkListboxModule,
        ReactiveFormsModule,
        LoadingModule,
        SluiIconModule,
    ],
    templateUrl: './select-employee.component.html',
    styles: `:host {@apply block;}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectEmployeeComponent),
        multi: true,
    }]
})
export class SelectEmployeeComponent implements OnDestroy, ControlValueAccessor {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectEmployeeList);
    isLoading$ = this.store.select(fromRootStore.selectIsFetchEmployeeListPending);

    subscription: Subscription | null = null;
    control = new FormControl();
    isOpened = false;
    value: EmployeeModel | null = null;

    changeFunction: Function = (): void => { };
    touchedFuntion: Function = (): void => { };

    constructor() {
        this.subscription = this.control.valueChanges.pipe(
            tap(_ => this.touchedFuntion()),
            filter((value) => value?.length >= 3),
            debounceTime(500),
        ).subscribe(searchString => {
            this.store.dispatch(fromRootStore.FetchEmployeeListBegin({ filter: { searchString } }));
        });
    }

    compareItems(item1: any, item2: any) {
        return item1 === item2 || item1?.id === item2?.id;
    }

    selectValue(event: Partial<ListboxValueChangeEvent<any>>) {
        if (event?.value?.length) {
            this.isOpened = false;
            this.changeFunction(event.value[0]);
            this.value = event.value[0];
            const name = event.value[0].name.first + ' ' + event.value[0]?.name?.middle + ' ' + event.value[0]?.name?.last;
            this.control.setValue(name);
        } else {
            this.changeFunction(null);
            this.value = null;
            this.control.setValue(null);
        }
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    registerOnChange(fn: any): void {
        this.changeFunction = fn;
    }

    registerOnTouched(fn: any): void {
        this.touchedFuntion = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    writeValue(obj: any): void {
        if (!obj) return;
        this.value = obj;
        const name = obj.name.first + ' ' + obj?.name?.middle + ' ' + obj?.name?.last;
        this.control.setValue(name);
    }
}

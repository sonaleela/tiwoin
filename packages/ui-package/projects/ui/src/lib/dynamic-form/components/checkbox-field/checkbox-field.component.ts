import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { DynamicField } from "../field";

@Component({
    selector: 'slui-checkbox-field',
    templateUrl: './checkbox-field.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxFieldComponent implements DynamicField, OnDestroy {
    private _data: any;
    @Input() set data(data: any) {
        if (!data) return;
        this._data = data;
        data.controls.forEach((control: { label: 'Canada', description: '', value: 'Canada', checked: false }) => {
            this.controlsArray.push(this.fb.control(control.checked || false));
        });
    }
    get data() { return this._data; }

    valueChange: Subject<any> = new Subject();

    controlsArray: FormArray<FormControl>;
    subscriptions: any[] = [];

    constructor(private fb: FormBuilder) {
        this.controlsArray = this.fb.array([]);

        const subscription = this.controlsArray.valueChanges.subscribe(val => {
            const value = this.data.controls.filter((control: any, i: any) => !!val[i]);
            this.valueChange.next({
                ...this.data,
                value
            })
        });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}

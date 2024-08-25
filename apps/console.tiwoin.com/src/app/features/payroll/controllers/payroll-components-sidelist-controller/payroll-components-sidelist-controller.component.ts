import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-payroll-components-sidelist-controller',
    template: `<sonaleela-payroll-component-sidelist 
        [selectedIds]="selectedPayrollComponentId$ | async"
        [payrollComponentList]="payrollComponentList$ | async"
        [isPending]="isListPending$ | async"
        [error]="listError$ | async"
        [filterValue]="selectFilterPayrollComponentsBy$ | async"
        (toggleForm)="toggleForm()"
        (filterBy)="filterBy($event)"
        (selectComponentId)="selectComponentId($event)"
        (unSelectComponentId)="unSelectComponentId($event)"></sonaleela-payroll-component-sidelist>`,
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrollComponentsSidelistControllerComponent {
    private store: Store = inject(Store);

    isListPending$ = this.store.select(fromRootStore.selectIsFetchPayrollComponentListPending);
    listError$ = this.store.select(fromRootStore.selectFetchPayrollComponentListError);
    payrollComponentList$ = this.store.select(fromStore.selectPayrollComponentList);

    selectedPayrollComponentId$ = this.store.select(fromStore.selectedPayrollComponentIds);
    selectFilterPayrollComponentsBy$ = this.store.select(fromStore.selectFilterPayrollComponentsBy);

    constructor() {
        this.store.dispatch(fromRootStore.FetchPayrollComponentListBegin());
    }

    filterBy(filter: { [key: string]: string }) {
        this.store.dispatch(fromStore.FilterPayrollComponentList({ filter }));
    }

    selectComponentId(id: any) {
        this.store.dispatch(fromStore.SelectPayrollComponentId({ id }));
    }

    unSelectComponentId(id: any) {
        this.store.dispatch(fromStore.UnSelectPayrollComponentId({ id }));
    }

    toggleForm() {
        this.store.dispatch(fromStore.TogglePayrollComponentBar());
    }
}

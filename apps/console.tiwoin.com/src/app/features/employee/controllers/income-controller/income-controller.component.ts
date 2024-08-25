import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { FetchEmployee } from '../employee.class';
import * as fromRootStore from "@store";

@Component({
    selector: 'sonaleela-income-controller',
    templateUrl: './income-controller.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeControllerComponent extends FetchEmployee {
    public override store: Store = inject(Store);
    isPayrollListPending$ = this.store.select(fromRootStore.selectIsFetchPayrollListPending);
    payrollListerror$ = this.store.select(fromRootStore.selectFetchPayrollListError);
    payrollList$ = this.store.select(fromRootStore.selectPayrollList);

    constructor() {
        super();
        this.store.dispatch(fromRootStore.FetchPayrollListBegin());
    }

    addPayroll(event: boolean) {
        if (!event) return;

    }
}

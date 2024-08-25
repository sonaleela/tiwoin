import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from '@store';
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-payroll-list-controller',
    templateUrl: './payroll-list-controller.component.html',
    styles: [':host {@apply block h-full;}'],
})
export class PayrollListControllerComponent {
    private store: Store = inject(Store);

    isPending$ = this.store.select(fromRootStore.selectIsFetchPayrollListPending);
    error$ = this.store.select(fromRootStore.selectFetchPayrollListError);
    payrollList$ = this.store.select(fromRootStore.selectPayrollList);

    delete(id: string) {
        this.store.dispatch(fromStore.DeletePayrollBegin({ id }));
    }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-payroll-component-list-controller',
    templateUrl: `./payroll-component-list-controller.component.html`,
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollComponentListControllerComponent {
    private store: Store = inject(Store);

    isPending$ = this.store.select(fromRootStore.selectIsFetchPayrollComponentListPending);
    error$ = this.store.select(fromRootStore.selectFetchPayrollComponentListError);
    list$ = this.store.select(fromStore.selectPayrollComponentList);

    delete(id: string) {
        this.store.dispatch(fromStore.DeletePayrollComponentBegin({ id }));
    }
}

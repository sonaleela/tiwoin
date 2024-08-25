import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
    selector: 'sonaleela-add-payroll-controller',
    templateUrl: './add-payroll-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPayrollControllerComponent {
    private store: Store = inject(Store);

    selectedPayrollComponent$ = this.store.select(fromStore.selectedPayrollComponent);
    isAddPayrollPending$ = this.store.select(fromStore.selectIsAddPayrollPending);
    addPayrollError$ = this.store.select(fromStore.selectAddPayrollError);

    isForm$ = this.store.select(fromStore.selectIsPayrollSidenavForm);

    unSelectComponentId(id: any) {
        this.store.dispatch(fromStore.UnSelectPayrollComponentId({ id }));
    }

    submitForm(body: any) {
        this.store.dispatch(fromStore.AddPayrollBegin({ body }));
    }
}

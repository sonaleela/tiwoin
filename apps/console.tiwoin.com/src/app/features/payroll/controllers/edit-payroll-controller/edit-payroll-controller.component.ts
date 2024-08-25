import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from '@store';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store';

@Component({
    selector: 'sonaleela-edit-payroll-controller',
    templateUrl: './edit-payroll-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPayrollControllerComponent {
    private store: Store = inject(Store);

    payroll$ = this.store.select(fromRootStore.selectActivePayroll);
    selectedPayrollComponent$ = this.store.select(fromStore.selectedPayrollComponent);
    isEditPayrollPending$ = this.store.select(fromStore.selectIsEditPayrollPending);
    editPayrollError$ = this.store.select(fromStore.selectEditPayrollError);

    isForm$ = this.store.select(fromStore.selectIsPayrollSidenavForm);

    unSelectComponentId(id: any) {
        this.store.dispatch(fromStore.UnSelectPayrollComponentId({ id }));
    }

    submitForm(body: any) {
        this.store.dispatch(fromStore.UpdatePayrollBegin({ body }));
    }
}

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-add-payroll-component-controller',
    template: `<sonaleela-payroll-component-form
        [isPending]="isPending$ | async"
        [error]="error$ | async"
        (submitForm)="submitForm($event)"
        (close)="toggleForm()"></sonaleela-payroll-component-form>`,
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPayrollComponentControllerComponent {
    private store: Store = inject(Store);

    isPending$ = this.store.select(fromStore.selectIsAddPayrollPending);
    error$ = this.store.select(fromStore.selectAddPayrollError);

    submitForm(body: any) {
        this.store.dispatch(fromStore.AddPayrollComponentBegin({ body }));
    }

    toggleForm() {
        this.store.dispatch(fromStore.TogglePayrollComponentBar());
    }
}

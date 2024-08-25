import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { EmployeeModel } from '@models';
import * as fromStore from '../../store';

@Component({
    selector: 'sonaleela-add-employee-controller',
    templateUrl: './add-employee-controller.component.html',
    styles: [':host { @apply flex flex-col h-full; }'],
})
export class AddEmployeeControllerComponent {
    private store: Store = inject(Store);

    isPending$ = this.store.select(fromStore.selectIsAddEmployeePending);
    error$ = this.store.select(fromStore.selectAddEmployeeError);

    submitAddEmployeeForm(body: EmployeeModel) {
        this.store.dispatch(fromStore.AddEmployeeBegin({ body }));
    }
}

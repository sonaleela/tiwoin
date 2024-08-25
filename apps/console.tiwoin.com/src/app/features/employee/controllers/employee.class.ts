import { Store } from '@ngrx/store';

import * as fromRootStore from '@store';
import * as fromStore from "../store";
import { EmployeeModel } from '@models';
import { inject } from '@angular/core';

export abstract class FetchEmployee {
    public store: Store = inject(Store);

    isEditPending$ = this.store.select(fromStore.selectIsUpdateEmployeePending);
    editError$ = this.store.select(fromStore.selectUpdateEmployeeError);

    employee$ = this.store.select(fromRootStore.selectActiveEmployee);
    isPending$ = this.store.select(fromRootStore.selectIsActiveEmployeePending);

    editEmployee(body: Partial<EmployeeModel>) {
        this.store.dispatch(fromStore.UpdateEmployeeBegin({ body }))
    }
}

import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from '@store';
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-employee-list-controller',
    templateUrl: './employee-list-controller.component.html',
    styles: [':host {@apply block;}']
})
export class EmployeeListControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectEmployeeList);
    isPending$ = this.store.select(fromRootStore.selectIsFetchEmployeeListPending);
    error$ = this.store.select(fromRootStore.selectFetchEmployeeListError);

    delete(id: string) {
        this.store.dispatch(fromStore.DeleteEmployeeBegin({ id }));
    }
}

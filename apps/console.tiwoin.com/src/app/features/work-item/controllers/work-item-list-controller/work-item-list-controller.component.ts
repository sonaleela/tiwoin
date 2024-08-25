import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from '@store';
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-work-item-list-controller',
    templateUrl: './work-item-list-controller.component.html',
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkItemListControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectWorkItemList);
    error$ = this.store.select(fromRootStore.selectFetchWorkItemListError)
    isPending$ = this.store.select(fromRootStore.selectIsFetchWorkItemListPending);
    longDateFormat$ = this.store.select(fromRootStore.selectLongDateFormat);

    delete(id: string) {
        this.store.dispatch(fromStore.DeleteWorkItemBegin({ id }));
    }
}

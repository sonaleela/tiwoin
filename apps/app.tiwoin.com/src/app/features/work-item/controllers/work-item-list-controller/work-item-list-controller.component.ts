import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";

@Component({
    selector: 'tiwoin-work-item-list-controller',
    templateUrl: './work-item-list-controller.component.html',
    styles: [`:host { @apply block bg-gray-100 h-full overflow-y-auto;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemListControllerComponent {
    private store: Store = inject(Store);

    workItems$ = this.store.select(fromRootStore.selectWorkItemList);
    isPending$ = this.store.select(fromRootStore.selectIsFetchWorkItemListPending);
    error$ = this.store.select(fromRootStore.selectFetchWorkItemListError);
}

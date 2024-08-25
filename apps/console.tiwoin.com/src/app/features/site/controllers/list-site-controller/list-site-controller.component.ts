import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from '@store';
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-list-site-controller',
    templateUrl: './list-site-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSiteControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectSiteList);
    isPending$ = this.store.select(fromRootStore.selectIsFetchSiteListPending);
    error$ = this.store.select(fromRootStore.selectFetchSiteListError);

    delete(id: string) {
        this.store.dispatch(fromStore.DeleteSiteBegin({ id }));
    }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";

@Component({
    selector: 'tiwoin-site-list-controller',
    templateUrl: './site-list-controller.component.html',
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteListControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectSiteList);
    error$ = this.store.select(fromRootStore.selectFetchSiteListError);
    isPending$ = this.store.select(fromRootStore.selectIsFetchSiteListPending);
}

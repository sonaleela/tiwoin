import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";

@Component({
    selector: 'sonaleela-side-nav',
    templateUrl: './side-nav.component.html',
    styles: [':host { @apply flex-none flex flex-col !w-side-nav h-full bg-gray-75 border-r border-gray-300; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
    private store: Store = inject(Store);

    organization$ = this.store.select(fromRootStore.selectOrganization);
    profile$ = this.store.select(fromRootStore.selectProfile);

    toggleSidenav() {
        this.store.dispatch(fromRootStore.ToggleSidenav({ state: 'MINI' }));
    }
}

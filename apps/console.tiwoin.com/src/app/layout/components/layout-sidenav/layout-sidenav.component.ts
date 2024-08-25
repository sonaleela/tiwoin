import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";

@Component({
    selector: 'sonaleela-layout-sidenav',
    templateUrl: './layout-sidenav.component.html',
    styles: [':host { @apply flex flex-row h-full; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSidenavComponent {
    private store: Store = inject(Store);

    sidenavState$ = this.store.select(fromRootStore.selectSidenavState);

    toggleSidenav() {
        this.store.dispatch(fromRootStore.ToggleSidenav({ state: 'FULL' }));
    }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";

@Component({
    selector: 'tiwoin-sidenav',
    templateUrl: './sidenav.component.html',
    styles: [`:host { @apply block bg-gray-100 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
    constructor(private store: Store) { }

    toggleSidenav() {
        this.store.dispatch(fromRootStore.ToggleSidenav({}));
    }
}

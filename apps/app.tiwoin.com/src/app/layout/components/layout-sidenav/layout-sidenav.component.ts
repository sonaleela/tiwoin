import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromRootStore from "@store";
import { SiteModel } from '@models';

@Component({
    selector: 'tiwoin-layout-sidenav',
    templateUrl: './layout-sidenav.component.html',
    styles: [':host { @apply flex flex-col h-full;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSidenavComponent {
    private store: Store = inject(Store);

    sidenavState$ = this.store.select(fromRootStore.selectSidenavState);
    organizationName$ = this.store.select(fromRootStore.selectOrganization).pipe(map(org => org?.name));
    activeSite$ = this.store.select(fromRootStore.selectSite);
    siteList$ = this.store.select(fromRootStore.selectSiteList);

    toggleSidenav() {
        this.store.dispatch(fromRootStore.ToggleSidenav({}));
    }

    selectedSite(site: SiteModel) {
        this.store.dispatch(fromRootStore.SetAppSite({ site }));
    }
}

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SiteModel } from '@models';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromRootStore from "@store";

@Component({
    selector: 'sonaleela-edit-site-controller',
    templateUrl: './edit-site-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSiteControllerComponent {
    private store: Store = inject(Store);

    isEditSitePending$ = this.store.select(fromStore.selectIsEditSitePending);
    editSiteError$ = this.store.select(fromStore.selectEditSiteError);
    site$ = this.store.select(fromRootStore.selectActiveSite);
    isSitePending$ = this.store.select(fromRootStore.selectIsFetchSiteListPending);

    state$ = this.store.select(fromRootStore.selectStateName);
    country$ = this.store.select(fromRootStore.selectCountryName);
    cityList$ = this.store.select(fromRootStore.selectCityList);

    drawing(geoJson: any) {
        this.store.dispatch(fromStore.SetGeoFence({ geoJson }));
    }

    submitForm(site: SiteModel) {
        this.store.dispatch(fromStore.UpdateSiteBegin({ site }));
    }

    pinChange(pincode: string) {
        this.store.dispatch(fromRootStore.FetchPostalDataBegin({ pincode }));
    }

    addresssChange(payload: { address: string, postalCode: string }) {
        this.store.dispatch(fromRootStore.AddressGeolocationBegin({ payload }));
    }
}

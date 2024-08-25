import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SiteModel } from '@models';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromRootStore from "@store";
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'sonaleela-add-site-controller',
    templateUrl: './add-site-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSiteControllerComponent {
    private store: Store = inject(Store);

    isAddSitePending$ = this.store.select(fromStore.selectIsAddSitePending);
    addSiteError$ = this.store.select(fromStore.selectAddSiteError);

    state$ = this.store.select(fromRootStore.selectStateName);
    country$ = this.store.select(fromRootStore.selectCountryName);
    cityList$ = this.store.select(fromRootStore.selectCityList);
    geolocation$ = combineLatest([
        this.store.select(fromRootStore.selectAddressGeolocation),
        this.store.select(fromRootStore.selectDeviceGeoLocation),
    ]).pipe(map(([addressLocation, deviceLocation]) => {
        if (!addressLocation.lat && !addressLocation.lng) {
            this.zoomLevel = 12;
            return deviceLocation;
        }
        this.zoomLevel = 14;
        return addressLocation;
    }));

    zoomLevel = 0;

    drawing(geoJson: any) {
        this.store.dispatch(fromStore.SetGeoFence({ geoJson }));
    }

    submitForm(body: SiteModel) {
        this.store.dispatch(fromStore.AddSiteBegin({ body }));
    }

    pinChange(pincode: string) {
        this.store.dispatch(fromRootStore.FetchPostalDataBegin({ pincode }));
    }

    addresssChange(payload: { address: string, postalCode: string }) {
        this.store.dispatch(fromRootStore.AddressGeolocationBegin({ payload }));
    }
}

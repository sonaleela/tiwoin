import { Component, inject } from '@angular/core';
import { SiteModel } from '@models';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromRootStore from "@store";
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'sonaleela-create-site-controller',
    templateUrl: './create-site-controller.component.html',
    styles: [':host { @apply flex flex-col h-full}'],
})
export class CreateSiteControllerComponent {
    private store: Store = inject(Store);

    organization$ = this.store.select(fromRootStore.selectOrganization);
    isPending$ = this.store.select(fromStore.selectCreateSitePending);
    error$ = this.store.select(fromStore.selectCreateSiteError);

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

    submitForm(body: Partial<SiteModel>) {
        this.store.dispatch(fromStore.CreateSiteBegin({ body }));
    }

    drawing(geoJson: any) {
        this.store.dispatch(fromStore.SetGeoFence({ geoJson }));
    }

    pinChange(pincode: number) {
        this.store.dispatch(fromRootStore.FetchPostalDataBegin({ pincode: `${pincode}` }));
    }

    addresssChange(payload: { address: string, postalCode: string }) {
        this.store.dispatch(fromRootStore.AddressGeolocationBegin({ payload }));
    }
}

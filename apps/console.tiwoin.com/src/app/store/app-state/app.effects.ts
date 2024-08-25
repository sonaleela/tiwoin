import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';

import * as fromActions from './app.actions';
import * as fromSelectors from "./app.selectors";
import * as fromAppConfigActions from "../app-config/app-config.actions";
import { AddressService, UserService } from '@services';

@Injectable()
export class AppEffects {
    private actions$: Actions = inject(Actions);
    private store: Store = inject(Store);
    private addressService: AddressService = inject(AddressService);
    private userService: UserService = inject(UserService);
    /**
     * Fetch profile
     */
    profileRequestBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ProfileRequestBegin),
        exhaustMap((_) => this.userService.fetch()),
        map((profile) => {
            return fromActions.ProfileRequestSuccess({ profile });
        }),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.ProfileReqeustFail({ error }));
            return caught;
        }),
    ));

    deviceGeoLocationBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeviceGeoLocationBegin),
        exhaustMap(_ => this.addressService.getDeviceLocation()),
        map(location => fromActions.DeviceGeoLocationUpdate(location)),
        catchError((error, caught) => {
            fromActions.DeviceGeoLocationError(error);
            return caught;
        })
    ));

    /**
     * Get Geo Location based on address
     */
    addressGeolocationBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddressGeolocationBegin),
        exhaustMap(payload => this.addressService.getGeoLocation(payload.payload.address, payload.payload.postalCode)),
        map(response => {
            return fromActions.AddressGeolocationSuccess({ ...response });
        }),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.AddressGeolocationFail({ error }));
            return caught;
        })
    ));

    /**
    * Fetch postal address based on PIN code
    */
    fetchPincodeDataBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchPostalDataBegin),
        exhaustMap(payload => this.addressService.getAddressList(payload.pincode)),
        map(postalData => {
            return fromActions.FetchPostalDataSuccess({ postalData })
        }),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchPostalDataFail({ error }));
            return caught;
        })
    ));

    /**
     * Set default organization
     */
    setDefaultOrganization = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SetDefaultOrganizationBegin),
        concatLatestFrom((_: any) => this.store.select(fromSelectors.selectProfile)),
        exhaustMap(([payload, profile]) => {
            if (!profile?.id) throw new Error('User id is not available!');

            return this.userService.update(profile.id, { defaultOrganization: payload.organizationId });
        }),
        mergeMap(_ => [
            fromActions.SetDefaultOrganizationSuccess(),
            fromAppConfigActions.PostAuthenticationInitBegin(),
        ]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.SetDefaultOrganizationFail({ error: error?.error?.message }));
            return caught;
        })
    ));
}

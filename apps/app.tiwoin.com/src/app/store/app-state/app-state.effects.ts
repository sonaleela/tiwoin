import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';

import { AddressService, EmployeeService, UserService, WebApiService } from '@services';
import * as fromActions from './app-state.actions';
import * as fromAppConfig from "../app-entity";
import * as fromSelectors from "./app-state.selectors";
import * as fromAppConfigActions from "../app-config/app-config.actions";

@Injectable()
export class AppStateEffects {
    private actions$: Actions = inject(Actions);
    private store: Store = inject(Store);
    private location: Location = inject(Location);
    private employeeService: EmployeeService = inject(EmployeeService);
    private addressService: AddressService = inject(AddressService);
    private userService: UserService = inject(UserService);
    private webApiService: WebApiService = inject(WebApiService);


    back$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.Back),
        tap(_ => this.location.back()),
    ), { dispatch: false });

    /**
     * Fetch profile begin
     */
    fetchProfileBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchProfileBegin),
        exhaustMap((_) => this.userService.fetch()),
        map((profile) => fromActions.FetchProfileSuccess({ profile })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchProfileFail({ error }));
            return caught;
        }),
    ));

    /**
     * Fetch and update devide geo location
     */
    deviceGeoLocationBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeviceGeoLocationBegin),
        exhaustMap(_ => this.addressService.getDeviceLocation()),
        map(location => location ? fromActions.DeviceGeoLocationUpdate(location) : fromActions.DeviceGeoLocationGranted()),
        catchError((error, caught) => {
            if (error.state === 'denied') this.store.dispatch(fromActions.DeviceGeoLocationDenied());
            else this.store.dispatch(fromActions.DeviceGeoLocationError(error));
            return caught;
        })
    ));

    /**
     * Update current active site based on device geo location
     */
    deviceGeoLocationUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeviceGeoLocationUpdate),
        concatLatestFrom(_ => this.store.select(fromAppConfig.selectSiteList)),
        map(([location, sites]: [any, any]) => {
            sites.forEach((site: any) => {
                this.addressService.containsLocation(site?.geoFence, location)
                    ? this.store.dispatch(fromActions.SetAppSite({ site }))
                    : null;
            });
        })
    ), { dispatch: false });

    /**
    * Fetch employee profile
    */
    fetchEmployeeProfileBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchEmployeeProfileBegin),
        concatLatestFrom(_ => this.store.select(fromSelectors.selectOrganization)),
        exhaustMap(([_, organization]) => {
            if (!organization?.employeeId) throw new Error('User is not an employee in selected organization');

            return this.employeeService.getEmployee(organization?.employeeId || '');
        }),
        map(employee => fromActions.FetchEmployeeProfileSuccess({ employee })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchEmployeeProfileFail({ error }));
            return caught;
        }),
    ));

    /**
    * Set default organization
    */
    setDefaultOrganization$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SetDefaultOrganizationBegin),
        concatLatestFrom(_ => this.store.select(fromSelectors.selectProfile)),
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

    /**
     * Check internet status
     */
    internetStatusBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.InternetStatusBegin),
        exhaustMap(_ => this.webApiService.checkInternetStatus()),
        map(isOffline => fromActions.InternetStatusOffline({ isOffline })),
    ));
}

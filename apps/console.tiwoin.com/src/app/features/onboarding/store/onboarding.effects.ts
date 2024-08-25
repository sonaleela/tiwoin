import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, mergeMap, tap } from 'rxjs/operators';

import { OrganizationService, SiteService } from '@services';
import { GeofenceDialogComponent } from "../components";
import * as fromActions from './onboarding.actions';
import * as fromRootStore from "@store";
import * as fromSelectors from "./onboarding.selectors";
import { Dialog } from '@angular/cdk/dialog';
import { of } from 'rxjs';

@Injectable()
export class OnboardingEffects {
    private actions$: Actions = inject(Actions);
    private organizationService: OrganizationService = inject(OrganizationService);
    private siteService: SiteService = inject(SiteService);
    private router: Router = inject(Router);
    private store: Store = inject(Store);
    private dialog: Dialog = inject(Dialog);

    /**
     * Create organization
     */
    createOrganizationBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.CreateOrganizationBegin),
        exhaustMap((payload) => this.organizationService.createOrganization(payload.body)),
        mergeMap((response) => {
            return [
                fromActions.CreateOrganizationSuccess({ response }),
                fromRootStore.SetAppOrganization({ organization: response }),
            ];
        }),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.CreateOrganizationFail({ error }));
            return caught;
        }),
    ));

    createOrganizationSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.CreateOrganizationSuccess),
        tap((_) => this.router.navigate(['/onboard-site'])),
    ), { dispatch: false },);

    /**
     * Create Site
     */
    createSiteBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.CreateSiteBegin),
        concatLatestFrom(_ => [
            this.store.select(fromRootStore.selectOrganization),
            this.store.select(fromSelectors.selectSiteGeoFence)
        ]),
        mergeMap(([payload, organization, geoFence]) => {
            if (!geoFence) {
                const dialogRef = this.dialog.open<any[]>(GeofenceDialogComponent, {
                    data: [payload, organization, geoFence],
                });

                return dialogRef.closed;
            } else {
                return of([payload, organization, geoFence]);
            }
        }),
        filter(payload => {
            if (!payload) this.store.dispatch(fromActions.CreateSiteCancel());
            return payload !== undefined;
        }),
        exhaustMap(payload => {
            if (!payload![1]?.id) throw new Error("Organization is not selected!");
            return this.siteService.createSite({ ...payload![0].body, geoFence: payload![2], organizationId: payload![1].id });
        }),
        map((res) => {
            return fromActions.CreateSiteSuccess();
        }),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.CreateSiteFail({ error }));
            return caught;
        }),
    ),);

    createSiteSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.CreateSiteSuccess),
        map((_) => fromActions.OnboardingComplete()),
    ),);

    /**
     * Onboarding Complete
     */
    onboardingComplete$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.OnboardingComplete),
        tap((_) => this.router.navigate(['/'])),
    ), { dispatch: false },);

    /**
     * Update organization user invitation either by accepting or rejecting
     */
    updateInvitationBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateInvitationBegin),
        exhaustMap(payload => {
            const { id, ...body } = payload.body;
            return this.organizationService.updateUser(id, body);
        }),
        mergeMap(_ => [fromActions.UpdateInvitationSuccess(), fromRootStore.PostAuthenticationInitBegin()]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UpdateInvitationFail({ error: error?.error?.message }));
            return caught;
        })
    ));
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { catchError, exhaustMap, filter, flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Dialog, DialogRef } from '@angular/cdk/dialog';

import * as fromActions from './site.actions';
import * as fromSelectors from "./site.selectors";
import * as fromRootStore from "@store";
import { SiteService } from '@services';
import { DialogDeleteComponent } from "../components";
import { GeofenceEmptyDialogComponent } from '@shared';
import { Observable, of } from 'rxjs';

@Injectable()
export class SiteEffects {
    private actions$: Actions = inject(Actions);
    private store: Store = inject(Store);
    private siteService: SiteService = inject(SiteService);
    private router: Router = inject(Router);
    private dialog: Dialog = inject(Dialog);

    /**
     * Add site
     */
    addSiteRequestBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddSiteBegin),
        concatLatestFrom(_ => [
            this.store.select(fromRootStore.selectOrganization),
            this.store.select(fromSelectors.selectSiteGeoFence)
        ]),
        mergeMap(([payload, organization, geoFence]) => {
            if (!geoFence) {
                const dialogRef = this.dialog.open<any[]>(GeofenceEmptyDialogComponent, {
                    data: [payload, organization, geoFence],
                });

                return dialogRef.closed;
            } else {
                return of([payload, organization, geoFence]);
            }
        }),
        filter(payload => {
            if (!payload) this.store.dispatch(fromActions.AddSiteCancel());
            return payload !== undefined;
        }),
        exhaustMap((payload) => {
            if (!payload![1]?.id) throw new Error("Organization is not selected!");

            return this.siteService.createSite({ ...payload![0].body, geoFence: payload![2], organizationId: payload![1].id });
        }),
        map((response) => fromActions.AddSiteSuccess()),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.AddSiteFail({ error }));
            return caught;
        }),
    ),);

    /**
     * Update site
     */
    updateSiteRequestBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateSiteBegin),
        concatLatestFrom(_ => [
            this.store.select(fromRootStore.selectOrganization),
            this.store.select(fromSelectors.selectSiteGeoFence),
            this.store.select(fromRootStore.selectActiveSiteId)
        ]),
        mergeMap(([payload, organization, geoFence, siteId]) => {
            if (!geoFence) {
                const dialogRef = this.dialog.open<any[]>(GeofenceEmptyDialogComponent, {
                    data: [payload, organization, geoFence, siteId],
                });

                return dialogRef.closed;
            } else {
                return of([payload, organization, geoFence, siteId]);
            }
        }),
        filter(payload => {
            if (!payload) this.store.dispatch(fromActions.AddSiteCancel());
            return payload !== undefined;
        }),
        exhaustMap((payload) => {
            if (!payload![3]) throw new Error("Site is not selected");

            return this.siteService.updateSite(payload![3], { ...payload![0].body, geoFence: payload![2], organizationId: payload![1].id });
        }),
        map(site => fromActions.UpdateSiteSuccess({ site })),
        catchError((error, caught) => {
            alert(error);
            this.store.dispatch(fromActions.UpdateSiteFail({ error }));
            return caught;
        })
    ));

    /**
     * Redirection after Add/Update operation
     */
    addSiteRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddSiteSuccess, fromActions.UpdateSiteSuccess),
        tap(_ => this.router.navigate(['/site']))
    ), { dispatch: false })

    /**
     * Delete site
     */
    deleteSiteBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeleteSiteBegin),
        mergeMap(payload => {
            const dialogRef = this.dialog.open<string>(DialogDeleteComponent, {
                data: { id: payload.id },
            });

            return (<Observable<string>>dialogRef.closed);
        }),
        filter(id => !!id),
        exhaustMap((id: string) => this.siteService.deleteSite(id || '')),
        mergeMap(response => [fromActions.DeleteSiteSuccess({ response }), fromRootStore.FetchSiteListBegin()]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.DeleteSiteFail({ error }));
            return caught;
        })
    ));
}

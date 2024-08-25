import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { WorkItemService } from '@services';
import * as fromRootStore from "@store";
import * as fromActions from './work-item.actions';
import { GeolocationEmptyDialogComponent } from '@shared';
import { Observable, of } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';

@Injectable()
export class WorkItemEffects {
    private actions$: Actions = inject(Actions);
    private workItemService: WorkItemService = inject(WorkItemService);
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private dialog: Dialog = inject(Dialog);

    /**
     * Add work item
     */
    workItemSubmissionBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.WorkItemSubmissionBegin),
        concatLatestFrom(_ => [
            this.store.select(fromRootStore.selectOrganization),
            this.store.select(fromRootStore.selectDeviceGeoLocation),
            this.store.select(fromRootStore.selectSite),
        ]),
        mergeMap(([payload, organization, geoLocation, site]) => {
            if (!geoLocation) {
                const dialogRef = this.dialog.open<any[]>(GeolocationEmptyDialogComponent, {
                    data: [payload, organization, geoLocation, site],
                });

                return (<Observable<any[]>>dialogRef.closed);
            } else {
                return of([payload, organization, geoLocation, site]);
            }
        }),
        filter(payload => {
            if (!payload) this.store.dispatch(fromActions.WorkItemSubmissionCancel());
            return payload !== undefined;
        }),
        exhaustMap(([payload, organization, geoLocation, site]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.workItemService.submitWorkItem({
                ...payload?.body,
                organizationId: organization?.id,
                geoLocation,
                siteId: site?.id,
            });
        }),
        map((response) => fromActions.WorkItemSubmissionSuccess({ response })),
        catchError((error, caught) => {
            alert(error);
            this.store.dispatch(fromActions.WorkItemSubmissionFail({ error }));
            return caught;
        }),
    ));

    /**
    * Redirection after submission operation
    */
    workItemSubmitSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.WorkItemSubmissionSuccess),
        tap(_ => this.router.navigate(['/work-item'])),
    ), { dispatch: false });
}

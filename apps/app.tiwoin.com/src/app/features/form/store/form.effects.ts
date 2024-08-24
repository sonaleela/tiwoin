import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { FormService, StorageService } from '@services';
import * as fromRootStore from "@store";
import * as fromActions from './form.actions';
import { EMPTY, Observable, forkJoin, of } from 'rxjs';
import { GeolocationEmptyDialogComponent } from '@shared';
import { Dialog } from '@angular/cdk/dialog';

@Injectable()
export class FormEffects {
    /**
     * Add form
     */
    formSubmissionBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FormSubmissionBegin),
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
            if (!payload) this.store.dispatch(fromActions.FormSubmissionCancel());
            return payload !== undefined;
        }),
        exhaustMap(([payload, organization, geoLocation, site]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.formService.submitForm({
                ...payload?.body,
                organizationId: organization?.id,
                geoLocation,
                siteId: site?.id,
            });
        }),
        map((response) => fromActions.FormSubmissionSuccess({ response })),
        catchError((error, caught) => {
            alert(error);
            this.store.dispatch(fromActions.FormSubmissionFail({ error }));
            return caught;
        }),
    ));

    /**
    * Redirection after submission operation
    */
    formSubmissionSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FormSubmissionSuccess),
        tap(_ => this.router.navigate(['/form'])),
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private formService: FormService,
        private store: Store,
        private router: Router,
        private dialog: Dialog,
        private storageService: StorageService,
    ) { }
}

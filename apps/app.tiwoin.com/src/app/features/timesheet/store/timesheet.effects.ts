import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, filter, map, mergeMap } from "rxjs/operators";
import { TimesheetService } from "@services";
import { Store } from "@ngrx/store";
import dayjs from "dayjs";

import { GeolocationEmptyDialogComponent } from "@shared";
import * as fromRootStore from "@store";
import * as fromActions from "./timesheet.actions";
import { Dialog } from "@angular/cdk/dialog";
import { of } from "rxjs";

@Injectable()
export class TimesheetEffects {
    private actions$: Actions = inject(Actions);
    private store: Store = inject(Store);
    private timesheetService: TimesheetService = inject(TimesheetService);
    private dialog: Dialog = inject(Dialog);

    /**
     * Create Clock entry
     */
    clockEntryBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ClockEntryBegin),
        concatLatestFrom(_ => [
            this.store.select(fromRootStore.selectDeviceGeoLocation),
        ]),
        mergeMap(([payload, geoLocation]) => {
            if (!geoLocation) {
                const dialogRef = this.dialog.open<any[]>(GeolocationEmptyDialogComponent, {
                    data: [payload],
                });

                return dialogRef.closed;
            } else {
                return of([payload]);
            }
        }),
        filter(payload => {
            if (!payload) this.store.dispatch(fromActions.ClockEntryCancel());
            return payload !== undefined;
        }),
        concatLatestFrom(() => [
            this.store.select(fromRootStore.selectOrganization),
            this.store.select(fromRootStore.selectEmployeeProfile),
            this.store.select(fromRootStore.selectDeviceGeoLocation),
            this.store.select(fromRootStore.selectSite),
        ]),
        exhaustMap(([payload, organization, employee, geoLocation, site]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");
            if (!employee?.id) throw new Error("Employee is not selected!");

            const body = {
                organizationId: organization?.id,
                employeeId: employee?.id,
                date: dayjs().toDate(),
                entry: {
                    ...payload![0]?.body,
                    geoLocation: geoLocation ?? null,
                },
                siteId: site?.id,
            };
            return this.timesheetService.clockEntry(employee?.id, body);
        }),
        mergeMap(response => [
            fromActions.ClockEntrySuccess({ response }),
            fromActions.FetchClockEntryBegin(),
        ]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.ClockEntryFail({ error }));
            return caught;
        })
    ));

    /**
     * Fetch timesheet clock entry
     */
    fetchClockEntryBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchClockEntryBegin),
        concatLatestFrom(() => [
            this.store.select(fromRootStore.selectOrganization),
        ]),
        exhaustMap(([_, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.timesheetService.getClockEntry(organization?.id);
        }),
        map(response => fromActions.FetchClockEntrySuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchClockEntryFail({ error }));
            return caught;
        })
    ));

    /**
     * Fetch types of entry to show on clock page
     */
    fetchEntryTypeBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchEntryTypeBegin),
        concatLatestFrom(() => this.store.select(fromRootStore.selectOrganization)),
        exhaustMap(([_, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.timesheetService.getEntryType(organization?.id);
        }),
        map(response => fromActions.FetchEntryTypeSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchEntryTypeFail({ error }));
            return caught;
        })
    ));
}

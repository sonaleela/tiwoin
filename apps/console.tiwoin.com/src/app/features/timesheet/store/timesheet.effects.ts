import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { TimesheetService } from "@services";
import { catchError, exhaustMap, filter, map, mergeMap, tap } from "rxjs/operators";

import * as fromActions from "./timesheet.actions";
import * as fromRootStore from "@store";
import { Router } from "@angular/router";
import { Dialog } from "@angular/cdk/dialog";
import { DeleteTimeEntryDialogComponent } from "@shared";

@Injectable()
export class TimesheetEffects {
    private actions$: Actions = inject(Actions);
    private timesheetService: TimesheetService = inject(TimesheetService);
    private dialog: Dialog = inject(Dialog);
    private store: Store = inject(Store);
    private router: Router = inject(Router);

    /**
     * Add timesheet
     */
    addTimesheetBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddTimesheetBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectOrganization)),
        exhaustMap(([payload, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.timesheetService.addTimesheet({ ...payload.body, organizationId: organization?.id });
        }),
        map((res) => fromActions.AddTimesheetSuccess()),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.AddTimesheetFail({ error }));
            return caught;
        })
    ));

    /**
     * Update timesheet
     */
    updateTimesheetBegin = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateTimesheetBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectActiveTimesheetId)),
        exhaustMap(([payload, id]) => {
            if (!id) throw new Error("Timesheet is not selected");

            return this.timesheetService.updateTimesheet(id, payload?.timesheet);
        }),
        map(response => fromActions.UpdateTimesheetSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UpdateTimesheetFail({ error }));
            return caught;
        })
    ));

    /**
     * Redirect after Add operation
     */
    addTimesheetSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddTimesheetSuccess, fromActions.UpdateTimesheetSuccess),
        tap(_ => this.router.navigate(['/timesheet']))
    ), { dispatch: false })

    /**
     * Delete timesheet
     */
    deleteTimesheet$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeleteTimesheetBegin),
        mergeMap(payload => {
            const dialogRef = this.dialog.open<{ id: string }>(DeleteTimeEntryDialogComponent, {
                data: { id: payload.id },
            });
            return dialogRef.closed;
        }),
        filter(payload => payload !== undefined),
        exhaustMap(payload => this.timesheetService.deleteTimesheet(payload?.id || '')),
        mergeMap(response => [fromActions.DeleteTimesheetSuccess({ response }), fromRootStore.FetchTimesheetListBegin()]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.DeleteTimesheetFail({ error }));
            return caught;
        })
    ));
}

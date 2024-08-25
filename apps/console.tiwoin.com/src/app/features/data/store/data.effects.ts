import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromActions from "./data.actions";
import * as fromRootStore from "@store";
import { DataService } from "@services";
import { extractErrorMessage } from "@shared";

@Injectable()
export class DataEffects {
    private stroe: Store = inject(Store);
    private router: Router = inject(Router);
    private actions$: Actions = inject(Actions);
    private dataService: DataService = inject(DataService);
    private route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * Approve form data
     */
    approveFormDataBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ApproveFormDataBegin),
        concatLatestFrom(_ => [
            this.stroe.select(fromRootStore.selectActiveEmployeeId),
            this.stroe.select(fromRootStore.selectProfile),
        ]),
        exhaustMap(([payload, _, profile]) => this.dataService.approveFormData(payload.data.id, { approvedBy: profile?.id, })),
        mergeMap(response => [fromActions.ApproveFormDataSuccess({ response })]),
        catchError((error, caught) => {
            this.stroe.dispatch(fromActions.ApproveFormDataFail({ error }));
            return caught;
        })
    ));

    /**
     * Update work item data
     */
    updateWorkItemBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateWorkItemDataBegin),
        exhaustMap((payload) => {
            return this.dataService.updateWorkItemData(payload.data.id, payload.data);
        }),
        mergeMap(response => [fromActions.UpdateWorkItemDataSuccess({ response })]),
        catchError((error, caught) => {
            this.stroe.dispatch(fromActions.UpdateWorkItemDataFail({ error }));
            return caught;
        }),
    ));

    /**
     * Approve work item data
     */
    approveWorkItemBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ApproveWorkItemDataBegin),
        concatLatestFrom(_ => [
            this.stroe.select(fromRootStore.selectActiveEmployeeId),
            this.stroe.select(fromRootStore.selectProfile)],
        ),
        exhaustMap(([payload, _, profile]) => this.dataService.approveWorkItemData(payload.data.id, { approvedBy: profile?.id, })),
        mergeMap(response => [fromActions.ApproveWorkItemDataSuccess({ response })]),
        catchError((error, caught) => {
            this.stroe.dispatch(fromActions.ApproveWorkItemDataFail({ error }));
            return caught;
        }),
    ));

    /**
     * Add timesheet data
     */
    addTimesheetData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddTimesheetDataBegin),
        concatLatestFrom(_ => [this.stroe.select(fromRootStore.selectOrganization)]),
        exhaustMap(([payload, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");
            return this.dataService.addTimesheetData(organization?.id, payload.data);
        }),
        map(response => fromActions.AddTimesheetDataSuccess({ response })),
        catchError((error, caught) => {
            this.stroe.dispatch(fromActions.AddTimesheetDataFail({ error: extractErrorMessage(error) }));
            return caught;
        })
    ));

    /**
     * Update timesheet data
     */
    updateTimesheetData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateTimesheetDataBegin),
        exhaustMap(payload => this.dataService.updateTimesheetData(payload.data.id, payload.data)),
        map(response => fromActions.UpdateTimesheetDataSuccess({ response })),
        catchError((error, caught) => {
            this.stroe.dispatch(fromActions.UpdateTimesheetDataFail({ error: extractErrorMessage(error) }));
            return caught;
        })
    ));

    addUpdateTimesheetData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddTimesheetDataSuccess, fromActions.UpdateTimesheetDataSuccess),
        tap(_ => {
            this.router.navigate([{ outlets: { aside: null } }], { relativeTo: this.route.children[0], queryParamsHandling: 'preserve' });
        }),
    ), { dispatch: false });
}

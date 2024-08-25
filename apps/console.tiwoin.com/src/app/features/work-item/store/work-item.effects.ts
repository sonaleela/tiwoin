import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, filter, flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';

import { WorkItemService } from '@services';
import * as fromRootStore from "@store";
import { DeleteWorkItemDialogComponent, extractErrorMessage } from '@shared';
import * as fromActions from './work-item.actions';

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
    addWorkItemBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddWorkItemBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectOrganization)),
        exhaustMap(([payload, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.workItemService.addWorkItem({ ...payload.body, organizationId: organization?.id })
        }),
        map((response) => fromActions.AddWorkItemSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.AddWorkItemFail({ error: extractErrorMessage(error) }));
            return caught;
        }),
    ));

    /**
     * Edit work item
     */
    editWorkItemBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.EditWorkItemBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectActiveWorkItemId)),
        exhaustMap(([payload, id]) => {
            if (!id) throw new Error("Work item is not selected");
            return this.workItemService.editWorkItem(id, payload.body);
        }),
        map(response => fromActions.EditWorkItemSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.EditWorkItemFail({ error: extractErrorMessage(error) }));
            return caught;
        })
    ));

    /**
     * Submit work item
     */
    submitWorkItemBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SubmitWorkItemBegin),
        concatLatestFrom(_ => [
            this.store.select(fromRootStore.selectOrganization),
            this.store.select(fromRootStore.selectProfile),
        ]),
        exhaustMap(([payload, organization, profile]) => {
            if (!organization?.id) throw new Error('Organization is not available!');

            return this.workItemService.submitWorkItem({
                ...payload.body,
                organizationId: organization.id,
                submittedBy: profile?.id,
            });
        }),
        map(response => fromActions.SubmitWorkItemSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.SubmitWorkItemFail({ error: extractErrorMessage(error) }));
            return caught;
        })
    ));

    /**
     * Redirection after Add/Update/submit operation
     */
    addWorkItemRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddWorkItemSuccess, fromActions.EditWorkItemSuccess, fromActions.SubmitWorkItemSuccess),
        tap(_ => this.router.navigate(['/work-item'])),
    ), { dispatch: false });

    /**
     * Delete work item
     */
    deleteWorkItemBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeleteWorkItemBegin),
        flatMap(payload => {
            const dialogRef = this.dialog.open<{ id: string }>(DeleteWorkItemDialogComponent, {
                data: { id: payload.id },
            });

            return dialogRef.closed;
        }),
        filter(payload => payload !== undefined),
        exhaustMap(payload => this.workItemService.deleteWorkItem(payload?.id || '')),
        mergeMap(response => [fromActions.DeleteWorkItemSuccess({ response }), fromRootStore.FetchWorkItemListBegin()]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.DeleteWorkItemFail({ error }));
            return caught;
        })
    ));
}

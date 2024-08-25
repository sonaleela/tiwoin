import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, filter, flatMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Dialog } from "@angular/cdk/dialog";

import { FormService } from "@services";
import * as fromRootStore from "@store";
import * as fromActions from "./form.actions";
import { DeleteFormDialogComponent, extractErrorMessage } from "@shared";

@Injectable()
export class FormEffects {
    private actions$: Actions = inject(Actions);
    private formService: FormService = inject(FormService);
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private dialog: Dialog = inject(Dialog);

    /**
     * Add form item
     */
    addFormBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddFormBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectOrganization)),
        exhaustMap(([payload, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.formService.addForm({ ...payload.body, organizationId: organization?.id });
        }),
        map(response => fromActions.AddFormSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.AddFormFail({ error: extractErrorMessage(error) }));
            return caught;
        })
    ));

    /**
     * Delete form
     */
    deleteFormBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeleteFormBegin),
        flatMap(payload => {
            const dialogRef = this.dialog.open<{ id: string }>(DeleteFormDialogComponent, {
                data: { id: payload.id },
            });

            return dialogRef.closed;
        }),
        filter(payload => payload !== undefined),
        exhaustMap(payload => this.formService.deleteForm(payload?.id || '')),
        mergeMap(response => [fromActions.DeleteFormSuccess(), fromRootStore.FetchFormListBegin()]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.DeleteFormFail({ error }));
            return caught;
        })
    ));

    /**
     * Update form
     */
    updateFormBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateFormBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectActiveFormId)),
        exhaustMap(([payload, id]) => {
            if (!id) throw new Error("Form is not selected");

            return this.formService.updateForm(id, payload?.body);
        }),
        map(response => fromActions.UpdateFormSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UpdateFormFail({ error: extractErrorMessage(error) }));
            return caught;
        })
    ));

    addFormSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddFormSuccess, fromActions.UpdateFormSuccess),
        tap(_ => this.router.navigate(['/form'])),
    ), { dispatch: false });

    /**
     * Set active form for form builder editor
     */
    setActiveForm$ = createEffect(() => this.actions$.pipe(
        ofType(fromRootStore.FetchFormSuccess),
        map(response => fromActions.SetActiveForm({ form: response.form }))
    ));
}

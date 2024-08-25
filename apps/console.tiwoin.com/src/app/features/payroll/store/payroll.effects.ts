import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, filter, flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';

import * as fromRootStore from '@store';
import { PayrollService } from '@services';
import { DeletePayrollComponentDialogComponent, DeletePayrollDialogComponent } from '@shared';
import * as fromActions from './payroll.actions';

@Injectable()
export class PayrollEffects {
    private actions$: Actions = inject(Actions);
    private payrollService: PayrollService = inject(PayrollService);
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private dialog: Dialog = inject(Dialog);

    /**
     * Add payroll
     */
    addPayrollBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddPayrollBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectOrganization)),
        exhaustMap(([payload, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.payrollService.addPayroll({ ...payload.body, organizationId: organization?.id });
        }),
        map(response => fromActions.AddPayrollSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.AddPayrollFail({ error }));
            return caught;
        })
    ));

    /**
     * Update payroll
     */
    updatePayrollBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdatePayrollBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectActivePayrollId)),
        exhaustMap(([payload, id]) => {
            if (!id) throw new Error("Employee is not selected");
            return this.payrollService.updatePayroll(id, payload.body);
        }),
        map(response => fromActions.UpdatePayrollSuccss({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UpdatePayrollFail({ error }));
            return caught;
        })
    ))

    /**
     * Redirect after Add/update operations
     */
    addEmployeeRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddPayrollSuccess, fromActions.UpdatePayrollSuccss),
        tap(_ => this.router.navigate(['/payroll']))
    ), { dispatch: false })

    /**
     * Delete payroll
     */
    deletePayrollBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeletePayrollBegin),
        flatMap(payload => {
            const dialogRef = this.dialog.open<{ id: string }>(DeletePayrollDialogComponent, {
                data: { id: payload.id },
            });

            return dialogRef.closed;
        }),
        filter(payload => payload !== undefined),
        exhaustMap(payload => this.payrollService.deletePayroll(payload?.id || '')),
        mergeMap(response => [fromActions.DeletePayrollSuccess({ response }), fromRootStore.FetchPayrollListBegin()]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.DeletePayrollFail({ error }));
            return caught;
        })
    ))

    /**
     * Delete payroll component
     */
    deletePayrollComponentBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeletePayrollComponentBegin),
        flatMap(payload => {
            const dialogRef = this.dialog.open<{ id: string }>(DeletePayrollComponentDialogComponent, {
                data: { id: payload.id },
            });

            return dialogRef.closed;
        }),
        filter(payload => payload !== undefined),
        exhaustMap(payload => this.payrollService.deletePayrollComponent(payload?.id || '')),
        mergeMap(response => [fromActions.DeletePayrollComponentSuccess({ response }), fromRootStore.FetchPayrollComponentListBegin()]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.DeletePayrollComponentFail({ error }));
            return caught;
        }),
    ));

    /**
     * Add payroll component
     */
    addPayrollComponentBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddPayrollComponentBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectOrganization)),
        exhaustMap(([payload, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.payrollService.addPayrollComponent({ ...payload.body, organizationId: organization?.id });
        }),
        mergeMap(response => [
            fromActions.AddPayrollComponentSuccess({ response }),
            fromActions.TogglePayrollComponentBar(),
            fromActions.SelectPayrollComponentId({ id: response?.id || '' }),
        ]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.AddPayrollComponentFail({ error }));
            return caught;
        })
    ));

    setActivePayrollComponent$ = createEffect(() =>
        this.store.select(fromRootStore.selectActivePayroll).pipe(
            filter(payload => !!payload),
            map(payload => {
                const id = [...(payload?.earning.map(item => item.id) as string[]), ...(payload?.deduction.map(item => item.id) as string[])];
                return fromActions.SelectPayrollComponentId({ id });
            }),
        )
    );
}

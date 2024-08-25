import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, filter, flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from "@angular/router";
import { Dialog } from '@angular/cdk/dialog';
import * as fromRootStore from "@store";

import { DataService, EmployeeService } from '@services';
import * as fromActions from './employee.actions';
import { DeleteEmployeeDialogComponent, extractErrorMessage } from '@shared';

@Injectable()
export class EmployeeEffects {
    private employeeService: EmployeeService = inject(EmployeeService);;
    private dataService: DataService = inject(DataService);
    private actions$: Actions = inject(Actions);
    private router: Router = inject(Router);
    private dialog: Dialog = inject(Dialog);
    private store: Store = inject(Store);

    /**
     * Add employee
     */
    addEmployeeBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddEmployeeBegin),
        concatLatestFrom(_ => [
            this.store.select(fromRootStore.selectOrganization),
            this.store.select(fromRootStore.selectProfile),
        ]),
        exhaustMap(([payload, organization, profile]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");
            if (!profile?.id) throw new Error("User profile is not found!");

            return this.employeeService.addEmployee({ ...payload.body, organizationId: organization?.id, userId: profile?.id })
        }
        ),
        map((response) => fromActions.AddEmployeeSuccess({ response })),
        catchError((error, caught) => {
            console.log(error);
            this.store.dispatch(fromActions.AddEmployeeFail({ error: extractErrorMessage(error) }));
            return caught;
        }),
    ));

    /**
     * Redirect after Add operation
     */
    addEmployeeSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddEmployeeSuccess),
        tap(_ => this.router.navigate(['/employee']))
    ), { dispatch: false });

    /**
     * Update employee
     * Take active employee id from entity state
     */
    updateEmployeeBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateEmployeeBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectActiveEmployeeId)),
        exhaustMap(([payload, id]) => {
            if (!id) throw new Error("Employee is not selected");

            return this.employeeService.updateEmployee(id, payload.body);
        }),
        map(response => fromActions.UpdateEmployeeSuccess({ response })),
        catchError((error, caught) => {
            alert(error);
            this.store.dispatch(fromActions.UpdateEmployeeFail({ error }));
            return caught;
        })
    ));

    updateEmployeeSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateEmployeeSuccess),
        map(res => fromRootStore.FetchEmployeeBegin({ uid: res?.response?.id ?? '', skipCache: true })),
    ));

    /**
     * Delete employee
     */
    deleteEmployeeBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeleteEmployeeBegin),
        flatMap(payload => {
            const dialogRef = this.dialog.open<{ id: string }>(DeleteEmployeeDialogComponent, {
                data: { id: payload.id },
            });

            return dialogRef.closed;
        }),
        filter(payload => payload !== undefined),
        exhaustMap(payload => this.employeeService.deleteEmployee(payload?.id || '')),
        mergeMap(response => [
            fromActions.DeleteEmployeeSuccess({ response }),
            fromRootStore.FetchEmployeeListBegin({}),
        ]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.DeleteEmployeeFail({ error }));
            return caught;
        })
    ));

    /** 
     * Request document upload
    */
    requestDocumentBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.RequestDocumentBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectActiveEmployeeId)),
        exhaustMap(([payload, id]) => {
            if (!id) throw new Error("Employee is not selected");
            return this.employeeService.requestDocument(id, payload.body);
        }),
        mergeMap(response => [
            fromActions.RequestDocumentSuccess({ response }),
            fromActions.FetchDocumentListBegin(),
        ]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.RequestDocumentFail({ error }));
            return caught;
        })
    ))

    /**
     * Fetch document list
     */
    fetchDocumentListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchDocumentListBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectActiveEmployeeId)),
        exhaustMap(([_, uid]) => this.employeeService.getDocumentList(uid)),
        map(response => fromActions.FetchDocumentListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchDocumentListFail({ error }));
            return caught;
        }),
    ));

    /**
     * Add advance payment
     */
    addAdvancePaymentBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddAdvancePaymentBegin),
        concatLatestFrom(_ => [
            this.store.select(fromRootStore.selectOrganization),
            this.store.select(fromRootStore.selectActiveEmployeeId),
        ]),
        exhaustMap(([payload, organization, employeeId]) => {
            if (!employeeId) throw new Error("Employee is not selected");
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.dataService.addAdvancePayment(employeeId, { ...payload.body, organizationId: organization.id });
        }),
        map(response => fromActions.AddAdvancePaymentSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.AddAdvancePaymentFail({ error: extractErrorMessage(error) }));
            return caught;
        })
    ));

    addAdvancePaymentSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddAdvancePaymentSuccess),
        mergeMap(_ => [fromActions.ToggleAdvancePaymentForm({}), fromRootStore.FetchAdvancePaymentDataBegin({ filter: {} })]),
    ));
}

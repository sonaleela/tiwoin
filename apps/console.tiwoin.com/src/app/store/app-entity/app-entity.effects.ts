import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromActions from './app-entity.actions';
import * as fromSelectors from './app-entity.selectors';
import * as fromRouter from '../app-router';
import * as fromAppState from "../app-state";
import {
    DataService,
    EmployeeService,
    FormService,
    OrganizationService,
    OrganizationUserService,
    PayrollService,
    SiteService,
    TimesheetService,
    UserService,
    WorkItemService,
} from '@services';
import { removeEmpty } from '@shared';

@Injectable()
export class AppEntityEffects {
    private organizationUserService: OrganizationUserService = inject(OrganizationUserService);
    private organizationService: OrganizationService = inject(OrganizationService);
    private timesheetService: TimesheetService = inject(TimesheetService);
    private employeeService: EmployeeService = inject(EmployeeService);
    private workItemService: WorkItemService = inject(WorkItemService);
    private payrollService: PayrollService = inject(PayrollService);
    private siteService: SiteService = inject(SiteService);
    private formService: FormService = inject(FormService);
    private dataService: DataService = inject(DataService);
    private actions$: Actions = inject(Actions);
    private router: Router = inject(Router);
    private store: Store = inject(Store);
    /**
     * Fetch employee list
     */
    fetchEmployeeListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchEmployeeListBegin),
        concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
        exhaustMap(([payload, organization]) => {
            if (!organization?.id) throw new Error('Organization is not available!');

            return this.employeeService.getEmployeeList(organization.id, payload.filter);
        }),
        map((response) => fromActions.FetchEmployeeListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchEmployeeListFail({ error }));
            return caught;
        }),
    ));

    /**
     * Fetch employee
     * Select employee from entities
     * If not in the entities then call the api to fetch employee by id
     */
    fetchEmployeeBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchEmployeeBegin),
        concatLatestFrom((_) => this.store.select(fromSelectors.selectActiveEmployee)),
        map(([payload, employee]) => (!payload?.skipCache && employee
            ? fromActions.FetchEmployeeSuccess({ employee })
            : fromActions.FetchEmployeeCacheMiss({ uid: payload.uid }))),
    ));

    fetchEmployeeCacheMiss$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchEmployeeCacheMiss),
        exhaustMap((payload) => this.employeeService.getEmployee(payload.uid)),
        map((employee) => fromActions.FetchEmployeeSuccess({ employee })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchEmployeeFail());
            return caught;
        })),
    );

    /**
     * Fetch payroll list
     */
    fetchPayrollListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchPayrollListBegin),
        concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
        exhaustMap(([_, organization]) => {
            return this.payrollService.getPayrollList(organization?.id || '');
        }),
        map((response) => fromActions.FetchPayrollListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchPayrollListFail({ error }));
            return caught;
        }),
    ));

    fetchPayrollBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchPayrollBegin),
        concatLatestFrom(() => this.store.select(fromRouter.selectRouteParam('uid'))),
        exhaustMap(([_, uid = '']) => this.payrollService.getPayroll(uid)),
        map((payroll) => fromActions.FetchPayrollSuccess({ payroll })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchPayrollFail());
            return caught;
        }),
    ));

    /**
     * Fetch payroll components
     */
    fetchPayrollComponentListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchPayrollComponentListBegin),
        concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
        exhaustMap(([_, organization]) => this.payrollService.getPayrollComponentList(organization?.id || '')),
        map((response) => fromActions.FetchPayrollComponentListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchPayrollComponentListFail({ error }));
            return caught;
        }),
    ));

    /**
     * Fetch organization list
     */
    organizaitonListRequestBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchOrganizationListBegin),
        exhaustMap((_) => this.organizationUserService.getOrganizationList()),
        map((response) => fromActions.FetchOrganizationListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchOrganizationListFail({ error }));
            return caught;
        }),
    ));

    /**
     * Fetch Work Item list
     */
    fetchWorkItemListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchWorkItemListBegin),
        concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
        exhaustMap(([_, organization]) => this.workItemService.getWorkItemList(organization?.id || '')),
        map((response) => fromActions.FetchWorkItemListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchWorkItemListFail());
            return caught;
        }),
    ));

    /**
     * Fetch work item
     * Select work item from entities
     * If not in the entities then call the api to fetch work item by id
     */
    fetchWorkItemBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchWorkItemBegin),
        concatLatestFrom((_) => this.store.select(fromSelectors.selectActiveWorkItem)),
        map(([_, workItem]) => (workItem ? fromActions.FetchWorkItemSuccess({ workItem }) : fromActions.FetchWorkItemCacheMiss()))
    ));

    fetchWorkItemCacheMiss$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchWorkItemCacheMiss),
        concatLatestFrom(() => this.store.select(fromRouter.selectRouteParam('uid'))),
        exhaustMap(([_, uid = '']) => this.workItemService.getWorkItem(uid)),
        map((workItem) => fromActions.FetchWorkItemSuccess({ workItem })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchWorkItemFail());
            return caught;
        })),
    );

    /**
     * Fetch Work Item list
     */
    fetchSiteListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchSiteListBegin),
        concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
        exhaustMap(([_, organization]) => this.siteService.getSiteList(organization?.id || '')),
        map((response) => fromActions.FetchSiteListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchSiteListFail());
            return caught;
        }),
    ));

    /**
     * Fetch Site
     * Select site from entities
     * If not in the entities then call the api to fetch site by id
     */
    fetchSiteBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchSiteBegin),
        concatLatestFrom((_) => this.store.select(fromSelectors.selectActiveSite)),
        map(([_, site]) => (site ? fromActions.FetchSiteSuccess({ site }) : fromActions.FetchSiteCacheMiss())),
    ));

    fetchSiteCacheMiss$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchSiteCacheMiss),
        concatLatestFrom(() => this.store.select(fromRouter.selectRouteParam('uid'))),
        exhaustMap(([_, uid = '']) => this.siteService.getSite(uid)),
        map((site) => fromActions.FetchSiteSuccess({ site })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchSiteFail());
            return caught;
        })),
    );

    /**
     * Dispatch `fetch form` action for `/form` route
     */
    fetchFormListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchFormListBegin),
        concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
        exhaustMap(([_, organization]) => this.formService.getFormList(organization?.id || '')),
        map((response) => fromActions.FetchFormListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchFormListFail());
            return caught;
        }),
    ));

    fetchFormBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchFormBegin),
        concatLatestFrom(() => this.store.select(fromRouter.selectRouteParam('uid'))),
        exhaustMap(([_, uid = '']) => this.formService.getForm(uid)),
        map((form) => fromActions.FetchFormSuccess({ form })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchFormFail());
            return caught;
        }),
    ));

    /**
     * Dispatch `fetch user list` action for `/user` route
     */
    fetchUserListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchUserListBegin),
        concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
        exhaustMap(([_, organization]) => this.organizationService.getUserList(organization?.id || '')),
        map(response => fromActions.FetchUserListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchUserListFail({ error }));
            return caught;
        })
    ));

    /**
     * Dispatch `fetch user` action for `/user/invite/:id`
     */
    fetchUserBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchUserBegin),
        concatLatestFrom(() => [
            this.store.select(fromRouter.selectRouteParam('uid')),
        ]),
        exhaustMap(([_, uid = '']) => this.organizationService.getOrganizationUser(uid)),
        map(response => fromActions.FetchUserSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchUserFail({ error }));
            return caught;
        })
    ));

    /**
     * Dispatch `fetch timesheet` action for `/timesheet` route
     */
    fetchTimesheetListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchTimesheetListBegin),
        concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
        exhaustMap(([_, organization]) => this.timesheetService.getTimesheetList(organization?.id || '')),
        map(response => fromActions.FetchTimesheetListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchTimesheetListFail({ error }));
            return caught;
        }),
    ));

    /**
     * Fetch timesheet
     * Select timesheet from entities
     * If not in the entities then call the api to fetch timesheet by id
     */
    fetchTimesheetBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchTimesheetBegin),
        concatLatestFrom((_) => this.store.select(fromSelectors.selectActiveTimesheet)),
        map(([_, response]) => (response ? fromActions.FetchTimesheetSuccess({ response }) : fromActions.FetchTimesheetCacheMiss())),
    ));

    fetchTimesheetCacheMiss$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchTimesheetCacheMiss),
        concatLatestFrom(() => this.store.select(fromRouter.selectRouteParam('uid'))),
        exhaustMap(([_, uid = '']) => this.timesheetService.getTimesheet(uid)),
        map((response) => fromActions.FetchTimesheetSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchTimesheetFail({ error }));
            return caught;
        })),
    );

    /**
     * Filter redirect timesheet data
     */
    filterTimesheetData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FilterTimesheetData),
        map(payload => this.router.navigate(['/data/timesheet'], { queryParams: payload.filter })),
    ), { dispatch: false })

    /**
     * Fetch timesheet data 
     */
    fetchTimesheetDataBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchTimesheetDataBegin),
        concatLatestFrom(_ => [
            this.store.select(fromAppState.selectOrganization),
            this.store.select(fromSelectors.selectTimesheetDataFilter),
        ]),
        exhaustMap(([payload, organization, filter]) => {
            const filterRequest = removeEmpty({ ...filter, ...payload.filter });
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.dataService.getTimesheetData(organization.id, filterRequest);
        }),
        map(response => fromActions.FetchTimesheetDataSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchTimesheetDataFail({ error }))
            return caught;
        }),
    ));

    /**
     * Fetch timesheet data record
     * Select timesheet data record from entities
     * If not in the entities then call the api to fetch timesheet data record by id
     */
    fetchTimesheetDataRecordBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchTimesheetDataRecordBegin),
        concatLatestFrom((_) => this.store.select(fromSelectors.selectActiveTimesheetDataRecord)),
        map(([_, response]) => (response ? fromActions.FetchTimesheetDataRecordSuccess({ response }) : fromActions.FetchTimesheetDataRecordCacheMiss())),
    ));

    FetchTimesheetDataRecordCacheMiss$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchTimesheetDataRecordCacheMiss),
        concatLatestFrom(() => this.store.select(fromRouter.selectRouteParam('uid'))),
        exhaustMap(([_, uid = '']) => this.dataService.getTimesheetDataById(uid)),
        map((response) => fromActions.FetchTimesheetDataRecordSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchTimesheetDataRecordFail({ error }));
            return caught;
        })),
    );

    /**
     * Filter form data redirect
     */
    filterFormData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FilterFormsData),
        map(payload => this.router.navigate(['/data/form'], { queryParams: payload.filter })),
    ), { dispatch: false })

    /**
     * Fetch form data
     */
    fetchFormDataBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchFormDataBegin),
        concatLatestFrom(_ => [
            this.store.select(fromAppState.selectOrganization),
            this.store.select(fromSelectors.selectFormDataFilter),
        ]),
        exhaustMap(([payload, organization, filter]) => {
            const filterRequest = removeEmpty({ ...filter, ...payload.filter });
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.dataService.getFormData(organization.id, filterRequest);
        }),
        map(response => fromActions.FetchFormDataSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchFormDataFail({ error }));
            return caught;
        }),
    ));

    /**
     * Filter timesheet data redirect
     */
    filterPayrollData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FilterPayrollData),
        map(payload => this.router.navigate(['/data/payroll'], { queryParams: payload.filter })),
    ), { dispatch: false });

    /**
     * Fetch payroll data
     */
    fetchPayrollDataBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchPayrollDataBegin),
        concatLatestFrom(_ => [
            this.store.select(fromAppState.selectOrganization),
            this.store.select(fromSelectors.selectPayrollDataFilter),
        ]),
        exhaustMap(([payload, organization, filter]) => {
            const filterRequest = removeEmpty({ ...filter, ...payload.filter });
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.dataService.getPayrollData(payload.filter);
        }),
        map(response => fromActions.FetchPayrollDataSuccss({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchPayrollDataFail({ error }));
            return caught;
        }),
    ));

    /**
     * Filter redirect work items data
     */
    filterWorkItemsData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FilterWorkItemsData),
        map(payload => this.router.navigate(['/data/work-item'], { queryParams: payload.filter })),
    ), { dispatch: false });

    /**
     * Fetch work item data
     */
    fetchWorkItemDataBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchWorkItemDataBegin),
        concatLatestFrom(_ => [
            this.store.select(fromAppState.selectOrganization),
            this.store.select(fromSelectors.selectWorkItemDataFilter),
        ]),
        exhaustMap(([payload, organization, filter]) => {
            const filterRequest = removeEmpty({ ...filter, ...payload.filter });
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.dataService.getWorkItemData(organization.id, filterRequest);
        }),
        map(response => fromActions.FetchWorkItemDataSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchWorkItemDataFail({ error }));
            return caught;
        }),
    ));

    /**
     * Fetch work-item data record
     * Select work-item data record from entities
     * If not in the entities then call the api to fetch work-item data record by id
     */
    fetchWorkItemDataRecordBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchWorkItemDataRecordBegin),
        concatLatestFrom((_) => this.store.select(fromSelectors.selectActiveWorkItemDataRecord)),
        map(([_, response]) => (response ? fromActions.FetchWorkItemDataRecordSuccess({ response }) : fromActions.FetchWorkItemDataRecordCacheMiss())),
    ));

    FetchWorkItemDataRecordCacheMiss$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchWorkItemDataRecordCacheMiss),
        concatLatestFrom(() => this.store.select(fromRouter.selectRouteParam('uid'))),
        exhaustMap(([_, uid = '']) => this.dataService.getWorkItemDataById(uid)),
        map((response) => fromActions.FetchWorkItemDataRecordSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchWorkItemDataRecordFail({ error }));
            return caught;
        })),
    );

    /**
     * Fetch advance payment
     */
    fetchAdvancePaymentDataBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchAdvancePaymentDataBegin),
        concatLatestFrom(_ => [
            this.store.select(fromAppState.selectOrganization),
            this.store.select(fromSelectors.selectAdvancePaymentDataFilter),
            this.store.select(fromSelectors.selectActiveEmployeeId),
        ]),
        exhaustMap(([payload, organization, filter, employeeId]) => {
            const filterRequest = removeEmpty({ ...filter, ...payload.filter, employeeId });
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.dataService.getAdvancePaymentList(organization?.id, filterRequest);
        }),
        map(response => fromActions.FetchAdvancePaymentDataSucess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchAdvancePaymentDataFail({ error }));
            return caught;
        }),
    ));
}

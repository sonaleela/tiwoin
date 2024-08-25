import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromActions from './app-entity.actions';
import * as fromSelectors from './app-entity.selectors';
import * as fromRouter from '../app-router';
import * as fromAppState from "../app-state";
import { removeEmpty } from '@shared';
import {
    FormService,
    OrganizationService,
    PayrollService,
    SiteService,
    TimesheetService,
    EmployeeService,
    WorkItemService,
    OrganizationUserService,
} from '@services';

@Injectable()
export class AppEntityEffects {
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private actions$: Actions = inject(Actions);
    private siteService: SiteService = inject(SiteService);
    private formService: FormService = inject(FormService);
    private payrollService: PayrollService = inject(PayrollService);
    private workItemService: WorkItemService = inject(WorkItemService);
    private employeeService: EmployeeService = inject(EmployeeService);
    private timesheetService: TimesheetService = inject(TimesheetService);
    private organizationService: OrganizationService = inject(OrganizationService);
    private organizationUserService: OrganizationUserService = inject(OrganizationUserService);

    /**
     * Fetch payroll
     */
    fetchPayrollBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.FetchPayrollBegin),
            concatLatestFrom(() => this.store.select(fromRouter.selectRouteParam('uid'))),
            exhaustMap(([_, uid = '']) => this.payrollService.getPayroll(uid)),
            map((payroll) => fromActions.FetchPayrollSuccess({ payroll })),
            catchError((error, caught) => {
                console.log({ error });
                this.store.dispatch(fromActions.FetchPayrollFail());
                return caught;
            }),
        ),
    );

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

    filterWorkItemSubmissionList$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FilterWorkItemSubmissionList),
        map(payload => this.router.navigate(['/work-item'], { queryParams: payload.filter }))
    ), { dispatch: false });

    /**
     * Fetch Work Item Submission list
     */
    fetchWorkItemSubmissionList$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchWorkItemSubmissionListBegin),
        concatLatestFrom(_ => [
            this.store.select(fromAppState.selectOrganization),
            this.store.select(fromSelectors.selectWorkItemSubmissionFilter),
        ]),
        exhaustMap(([payload, organization, filter]) => {
            const filterRequest = removeEmpty({ ...filter, ...payload.filter });
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.workItemService.getWorkItemSubmissionList(organization.id, filterRequest);
        }),
        map((response) => fromActions.FetchWorkItemSubmissionListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchWorkItemSubmissionListFail());
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
            console.log({ error });
            this.store.dispatch(fromActions.FetchWorkItemFail());
            return caught;
        })),
    );

    /**
     * Fetch Work Item list
     */
    fetchSiteListBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.FetchSiteListBegin),
            concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
            exhaustMap(([_, organization]) => this.siteService.getSiteList(organization?.id || '')),
            map((response) => fromActions.FetchSiteListSuccess({ response })),
            catchError((error, caught) => {
                this.store.dispatch(fromActions.FetchSiteListFail());
                return caught;
            }),
        ),
    );

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
            console.log({ error });
            this.store.dispatch(fromActions.FetchSiteFail());
            return caught;
        })),
    );

    /**
     * Dispatch `fetch form` action for `/form` route
     */
    fetchFormListBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.FetchFormListBegin),
            concatLatestFrom(_ => this.store.select(fromAppState.selectOrganization)),
            exhaustMap(([_, organization]) => this.formService.getFormList(organization?.id || '')),
            map((response) => fromActions.FetchFormListSuccess({ response })),
            catchError((error, caught) => {
                this.store.dispatch(fromActions.FetchFormListFail());
                return caught;
            }),
        ),
    );

    filterFormSubmissionList$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FilterFormSubmissionList),
        map(payload => this.router.navigate(['/form'], { queryParams: payload.filter })),
    ), { dispatch: false });

    /**
     * Fetch form data
     */
    fetchFormSubmissionListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchFormSubmissionListBegin),
        concatLatestFrom(_ => [
            this.store.select(fromAppState.selectOrganization),
            this.store.select(fromSelectors.selectWorkItemSubmissionFilter),
        ]),
        exhaustMap(([payload, organization, filter]) => {
            const filterRequest = removeEmpty({ ...filter, ...payload.filter });
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.formService.getFormSubmissionList(organization.id, filterRequest);
        }),
        map((data) => fromActions.FetchFormSubmissionListSuccess({ response: data })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchFormSubmissionListFail());
            return caught;
        }),
    ));

    fetchFormSubmissionBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchFormSubmissionBegin),
        concatLatestFrom((_) => this.store.select(fromSelectors.selectActiveFormSubmission)),
        map(([_, response]) => (response ? fromActions.FetchFormSubmissionSuccess({ form: response }) : fromActions.FetchFormSubmissionCacheMiss())),
    ));

    FetchFormSubmissionCacheMiss$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchFormSubmissionCacheMiss),
        concatLatestFrom(_ => this.store.select(fromRouter.selectRouteParam('uid'))),
        exhaustMap(([payload, uid]) => {
            if (!uid) throw new Error('Form submission id is not provided!');

            return this.formService.getFormSubmission(uid);
        }),
        map(response => fromActions.FetchFormSubmissionSuccess({ form: response.data })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchFormSubmissionFail({ error }))
            return caught;
        }),
    ));

    fetchFormBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchFormBegin),
        concatLatestFrom(_ => this.store.select(fromRouter.selectRouteParam('uid'))),
        exhaustMap(([_, uid = '']) => this.formService.getForm(uid)),
        map((form) => fromActions.FetchFormSuccess({ form })),
        catchError((error, caught) => {
            console.log({ error });
            this.store.dispatch(fromActions.FetchFormFail());
            return caught;
        }),
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
            console.log({ error });
            this.store.dispatch(fromActions.FetchTimesheetFail({ error }));
            return caught;
        })),
    );

    /**
     * Fetch organization list
     */
    organizaitonListRequestBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.FetchOrganizationListBegin),
            exhaustMap((_) => this.organizationUserService.getOrganizationList()),
            map((response) => fromActions.FetchOrganizationListSuccess({ response })),
            catchError((error, caught) => {
                this.store.dispatch(fromActions.FetchOrganizationListFail({ error }));
                return caught;
            }),
        ),
    );

    /**
     * Fetch document list
     */
    fetchDocumentListBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchDocumentListBegin),
        concatLatestFrom(_ => this.store.select(fromAppState.selectEmployeeProfile)),
        exhaustMap(([_, employee]) => {
            if (!employee?.id) throw new Error('Employee id is not available!');

            return this.employeeService.getDocumentList(employee.id);
        }),
        map(response => fromActions.FetchDocumentListSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchDocumentListFail({ error }));
            return caught;
        })
    ));

    filterTimesheetSubmissionList$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FilterTimesheetSubmissionList),
        map(payload => this.router.navigate(['/timesheet'], { queryParams: payload.filter })),
    ), { dispatch: false });

    /**
     * Fetch timesheet
     */
    fetchTimesheetDataBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.FetchTimesheetSubmissionListBegin),
        concatLatestFrom(_ => [
            this.store.select(fromAppState.selectOrganization),
            this.store.select(fromSelectors.selectWorkItemSubmissionFilter),
        ]),
        exhaustMap(([payload, organization, filter]) => {
            const filterRequest = removeEmpty({ ...filter, ...payload.filter });
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.timesheetService.getTimesheetData(organization.id, filterRequest);
        }),
        map(data => fromActions.FetchTimesheetSubmissionListSuccess({ response: data })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.FetchTimesheetSubmissionListFail({ error }));
            return caught;
        }),
    ));
}

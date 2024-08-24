import { createAction, props } from '@ngrx/store';
import { FilterList, FormModal, OrganizationModel, PayrollModel, SiteModel, WorkItemModal } from '@models';

/**
 * GET /payroll
 * Fetch payroll list
 */
export const FetchPayrollBegin = createAction('[Entity] Fetch Payroll Begin', props<{ uid: string }>());
export const FetchPayrollFail = createAction('[Entity] Fetch Payroll Fail');
export const FetchPayrollSuccess = createAction('[Entity] Fetch Payroll Success', props<{ payroll: PayrollModel }>());

/**
 * GET /user/document
 * Fetch document list
 */
export const FetchDocumentListBegin = createAction('[Entity] Fetch Document List Begin');
export const FetchDocumentListFail = createAction('[Entity] Fetch Document List Fail', props<{ error: string }>());
export const FetchDocumentListSuccess = createAction('[Entity] Fetch Document List Success', props<{ response: any[] }>());

/**
 * GET /work-item
 * Fetch work item list
 */
export const FetchWorkItemListBegin = createAction('[Entity] Fetch Work Item List Begin');
export const FetchWorkItemListFail = createAction('[Entity] Fetch Work Item List Fail');
export const FetchWorkItemListSuccess = createAction('[Entity] Fetch Work Item List Success', props<{ response: WorkItemModal[] }>());

export const FetchWorkItemBegin = createAction('[Entity] Fetch Work Item Begin', props<{ uid: string }>());
export const FetchWorkItemCacheMiss = createAction('[Entity] Fetch Work Item Cache Miss');
export const FetchWorkItemFail = createAction('[Entity] Fetch Work Item Fail');
export const FetchWorkItemSuccess = createAction('[Entity] Fetch Work Item Success', props<{ workItem: WorkItemModal }>());

/**
 * Get /work-item/submission
 */
export const FilterWorkItemSubmissionList = createAction('[Entity] Filter Work Item Submission List', props<{ filter: Partial<FilterList> }>());
export const FetchWorkItemSubmissionListBegin = createAction('[Entity] Fetch Work Item Submission List Begin', props<{ filter: FilterList }>());
export const FetchWorkItemSubmissionListFail = createAction('[Entity] Fetch Work Item Submission List Fail');
export const FetchWorkItemSubmissionListSuccess = createAction('[Entity] Fetch Work Item Submission List Success', props<{ response: { data: any[] } }>());

/**
 * GET /site
 * Fetch site list
 */
export const FetchSiteListBegin = createAction('[Entity] Fetch Site List Begin');
export const FetchSiteListFail = createAction('[Entity] Fetch Site List Fail');
export const FetchSiteListSuccess = createAction('[Entity] Fetch Site List Success', props<{ response: SiteModel[] }>());

export const FetchSiteBegin = createAction('[Entity] Fetch Site Begin', props<{ uid: string }>());
export const FetchSiteCacheMiss = createAction('[Entity] Fetch Site Cache Miss');
export const FetchSiteFail = createAction('[Entity] Fetch Site Fail');
export const FetchSiteSuccess = createAction('[Entity] Fetch Site Success', props<{ site: SiteModel }>());

/**
 * GET /form
 * Fetch form list
 */
export const FetchFormListBegin = createAction('[Entity] Fetch Form List Begin');
export const FetchFormListFail = createAction('[Entity] Fetch Form List Fail');
export const FetchFormListSuccess = createAction('[Entity] Fetch Form List Success', props<{ response: any }>());

export const FetchFormBegin = createAction('[Entity] Fetch Form Begin', props<{ uid: string }>());
export const FetchFormFail = createAction('[Entity] Fetch Form Fail');
export const FetchFormSuccess = createAction('[Entity] Fetch Form Success', props<{ form: FormModal }>());

/**
 * GET /form/submission
 */
export const FilterFormSubmissionList = createAction('[Entity] Filter Form Submission List', props<{ filter: Partial<FilterList> }>());
export const FetchFormSubmissionListBegin = createAction('[Entity] Fetch Form Submission List Begin', props<{ filter: FilterList }>());
export const FetchFormSubmissionListFail = createAction('[Entity] Fetch Form Submission List Fail');
export const FetchFormSubmissionListSuccess = createAction('[Entity] Fetch Form Submission List Success', props<{ response: { data: any[] } }>());

export const FetchFormSubmissionBegin = createAction('[Entity] Fetch Form Submission Begin', props<{ uid: string }>());
export const FetchFormSubmissionCacheMiss = createAction('[Entity] Fetch Form Submission Cache Miss');
export const FetchFormSubmissionFail = createAction('[Entity] Fetch Form Submission Fail', props<{ error: string }>());
export const FetchFormSubmissionSuccess = createAction('[Entity] Fetch Form Submission Success', props<{ form: FormModal }>());

/**
 * GET /timesheet
 * Fetch timesheet list
 */
export const FetchTimesheetListBegin = createAction('[Entity] Fetch Timesheet List Begin');
export const FetchTimesheetListFail = createAction('[Entity] Fetch Timesheet List Fail', props<{ error: string }>());
export const FetchTimesheetListSuccess = createAction('[Entity] Fetch User Timesheet Success', props<{ response: any }>());

export const FetchTimesheetCacheMiss = createAction('[Entity] Fetch Timesheet Cache Miss');
export const FetchTimesheetBegin = createAction('[Entity] Fetch Timesheet Begin', props<{ uid: string }>());
export const FetchTimesheetFail = createAction('[Entity] Fetch Timesheet Fail', props<{ error: string }>());
export const FetchTimesheetSuccess = createAction('[Entity] Fetch Timesheet Success', props<{ response: any }>());

/**
 * GET /data/timesheet
 * Fetch timesheet data
 */
export const FilterTimesheetSubmissionList = createAction('[Entity] Filter Timesheet Submission List', props<{ filter: Partial<FilterList> }>());
export const FetchTimesheetSubmissionListBegin = createAction('[Entity] Fetch Timesheet Submission List Begin', props<{ filter: any }>());
export const FetchTimesheetSubmissionListFail = createAction('[Entity] Fetch Timesheet Submission List Fail', props<{ error: string }>());
export const FetchTimesheetSubmissionListSuccess = createAction('[Entity] Fetch Timesheet Submission List Success', props<{ response: { data: any[] } }>())

/**
 * GET /data/payroll
 * Fetch payroll data
 */
export const FetchPayrollDataBegin = createAction('[Entity] Fetch Payroll Data Begin', props<{ filter: any }>());
export const FetchPayrollDataFail = createAction('[Entity] Fetch Payroll Data Fail', props<{ error: string }>());
export const FetchPayrollDataSuccss = createAction('[Entity] Fetch Payroll Data Success', props<{ response: any }>());

/**
 * GET /data/work-item
 * Fetch work-item data
 */
export const FetchWorkItemDataBegin = createAction('[Entity] Fetch Work Item Data Begin', props<{ filter: any }>());
export const FetchWorkItemDataFail = createAction('[Entity] Fetch Work Item Data Fail', props<{ error: string }>());
export const FetchWorkItemDataSuccess = createAction('[Entity] Fetch Work Item Data Success', props<{ response: any }>());

/**
 * GET /organization
 * Fetch organization list
 */
export const FetchOrganizationListBegin = createAction('[Entity] Fetch Organization List Begin');
export const FetchOrganizationListFail = createAction('[Entity] Fetch Organization List Fail', props<{ error: string }>());
export const FetchOrganizationListSuccess = createAction('[Entity] Fetch Organization List Success', props<{ response: { data: any[] } }>());

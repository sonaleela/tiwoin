import { createAction, props } from '@ngrx/store';
import {
    EmployeeModel,
    FilterList,
    FormModal,
    PayrollComponentModel,
    PayrollModel,
    SiteModel,
    WorkItemModal
} from '@models';

/**
 * GET /employee
 * Fetch employee list
 */
export const FetchEmployeeListBegin = createAction('[Entity] Fetch Employee List Begin', props<{ filter?: any }>());
export const FetchEmployeeListFail = createAction('[Entity] Fetch Employee List Fail', props<{ error: string }>());
export const FetchEmployeeListSuccess = createAction('[Entity] Fetch Employee List Success', props<{ response: { data: EmployeeModel[] } }>());

export const FetchEmployeeBegin = createAction('[Entity] Fetch Employee Begin', props<{ uid: string, skipCache?: boolean }>());
export const FetchEmployeeCacheMiss = createAction('[Entity] Fetch Employee Cache Miss', props<{ uid: string }>());
export const FetchEmployeeFail = createAction('[Entity] Fetch Employee Fail');
export const FetchEmployeeSuccess = createAction('[Entity] Fetch Employee Success', props<{ employee: EmployeeModel }>());

/**
 * GET /payroll
 * Fetch payroll list
 */
export const FetchPayrollListBegin = createAction('[Entity] Fetch Payroll List Begin');
export const FetchPayrollListFail = createAction('[Entity] Fetch Payroll List Fail', props<{ error: string }>());
export const FetchPayrollListSuccess = createAction('[Entity] Fetch Payroll List Success', props<{ response: PayrollModel[] }>());

export const FetchPayrollBegin = createAction('[Entity] Fetch Payroll Begin', props<{ uid: string }>());
export const FetchPayrollFail = createAction('[Entity] Fetch Payroll Fail');
export const FetchPayrollSuccess = createAction('[Entity] Fetch Payroll Success', props<{ payroll: PayrollModel }>());

/**
 * GET /payroll-component
 * Fetch payroll component list
 */
export const FetchPayrollComponentListBegin = createAction('[Entity] Fetch Payroll Component List Begin');
export const FetchPayrollComponentListFail = createAction('[Entity] Fetch Payroll Component List Fail', props<{ error: string }>());
export const FetchPayrollComponentListSuccess = createAction(
    '[Entity] Fetch Payroll Component List Success',
    props<{ response: PayrollComponentModel[] }>(),
);

/**
 * GET /organization
 * Fetch organization list
 */
export const FetchOrganizationListBegin = createAction('[Entity] Fetch Organization List Begin');
export const FetchOrganizationListFail = createAction('[Entity] Fetch Organization List Fail', props<{ error: string }>());
export const FetchOrganizationListSuccess = createAction('[Entity] Fetch Organization List Success', props<{ response: { data: any[] } }>());

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
 * GET /user
 * Fetch user list
 */
export const FetchUserListBegin = createAction('[Entity] Fetch User List Begin');
export const FetchUserListFail = createAction('[Entity] Fetch User List Fail', props<{ error: string }>());
export const FetchUserListSuccess = createAction('[Entity] Fetch User List Success', props<{ response: { data: any[] } }>());

export const FetchUserBegin = createAction('[Entity] Fetch User Begin', props<{ uid: string }>());
export const FetchUserFail = createAction('[Entity] Fetch User Fail', props<{ error: string }>());
export const FetchUserSuccess = createAction('[Entity] Fetch User Success', props<{ response: any }>());

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
export const FilterTimesheetData = createAction('[Entity] Filter Timesheet Data', props<{ filter: Partial<FilterList> }>());
export const FetchTimesheetDataBegin = createAction('[Entity] Fetch Timesheet Data Begin', props<{ filter: any }>());
export const FetchTimesheetDataFail = createAction('[Entity] Fetch Timesheet Data Fail', props<{ error: string }>());
export const FetchTimesheetDataSuccess = createAction('[Entity] Fetch Timesheet Data Success', props<{ response: any }>())

export const FetchTimesheetDataRecordCacheMiss = createAction('[Entity] Fetch Timesheet Data Record Cache Miss');
export const FetchTimesheetDataRecordBegin = createAction('[Entity] Fetch Timesheet Data Record Begin', props<{ uid: string }>());
export const FetchTimesheetDataRecordFail = createAction('[Entity] Fetch Timesheet Data Record Fail', props<{ error: string }>());
export const FetchTimesheetDataRecordSuccess = createAction('[Entity] Fetch Timesheet Data Record Success', props<{ response: any }>());

/**
 * GET /data/form
 * Fetch form data
 */
export const FilterFormsData = createAction('[Entity] Filter Forms Data', props<{ filter: Partial<FilterList> }>());
export const FetchFormDataBegin = createAction('[Entity] Fetch Form Data Begin', props<{ filter: any }>());
export const FetchFormDataFail = createAction('[Entity] Fetch Form Data Fail', props<{ error: string }>());
export const FetchFormDataSuccess = createAction('[Entity] Fetch Form Data Success', props<{ response: any }>());

export const FetchFormDataRecordCacheMiss = createAction('[Entity] Fetch Form Data Record Cache Miss');
export const FetchFormDataRecordBegin = createAction('[Entity] Fetch Form Data Record Begin', props<{ uid: string }>());
export const FetchFormDataRecordFail = createAction('[Entity] Fetch Form Data Record Fail', props<{ error: string }>());
export const FetchFormDataRecordSuccess = createAction('[Entity] Fetch Form Data Record Success', props<{ response: any }>());

/**
 * GET /data/payroll
 * Fetch payroll data
 */
export const FilterPayrollData = createAction('[Entity] Filter Payroll Data', props<{ filter: Partial<FilterList> }>())
export const FetchPayrollDataBegin = createAction('[Entity] Fetch Payroll Data Begin', props<{ filter: any }>());
export const FetchPayrollDataFail = createAction('[Entity] Fetch Payroll Data Fail', props<{ error: string }>());
export const FetchPayrollDataSuccss = createAction('[Entity] Fetch Payroll Data Success', props<{ response: any }>());

/**
 * GET /data/advance-payment
 */
export const FilterAdvancePaymentData = createAction('[Entity] Filter Advance Payment Data', props<{ filter: Partial<FilterList> }>());
export const FetchAdvancePaymentDataBegin = createAction('[Entity] Fetch Advance Payment Data Begin', props<{ filter: any }>());
export const FetchAdvancePaymentDataFail = createAction('[Entity] Fetch Advance Payment Data Fail', props<{ error: any }>());
export const FetchAdvancePaymentDataSucess = createAction('[Entity] Fetch Advance Payment Data Success', props<{ response: any }>());

/**
 * GET /data/work-item
 * Fetch work-item data
 */
export const FilterWorkItemsData = createAction('[Entity] Filter Work Items Data', props<{ filter: Partial<FilterList> }>());
export const FetchWorkItemDataBegin = createAction('[Entity] Fetch Work Item Data Begin', props<{ filter: FilterList }>());
export const FetchWorkItemDataFail = createAction('[Entity] Fetch Work Item Data Fail', props<{ error: string }>());
export const FetchWorkItemDataSuccess = createAction('[Entity] Fetch Work Item Data Success', props<{ response: { data: any[], total: number } }>());

export const FetchWorkItemDataRecordCacheMiss = createAction('[Entity] Fetch Work Item Data Record Cache Miss');
export const FetchWorkItemDataRecordBegin = createAction('[Entity] Fetch Work Item Data Record Begin', props<{ uid: string }>());
export const FetchWorkItemDataRecordFail = createAction('[Entity] Fetch Work Item Data Record Fail', props<{ error: any }>());
export const FetchWorkItemDataRecordSuccess = createAction('[Entity] Fetch Work Item Data Record Success', props<{ response: any }>());

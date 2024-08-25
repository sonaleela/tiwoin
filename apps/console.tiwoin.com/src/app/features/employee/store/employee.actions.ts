import { createAction, props } from '@ngrx/store';

import { DocumentModel, EmployeeModel } from '@models';

export const AddEmployeeBegin = createAction('[Employee] Add Employee Begin', props<{ body: EmployeeModel }>());
export const AddEmployeeFail = createAction('[Employee] Add Employee Fail', props<{ error: string }>());
export const AddEmployeeSuccess = createAction('[Employee] Add Employee Success', props<{ response: EmployeeModel }>());

export const UpdateEmployeeBegin = createAction('[Employee] Update Employee Begin', props<{ body: Partial<EmployeeModel> }>());
export const UpdateEmployeeFail = createAction('[Employee] Update Employee Fail', props<{ error: string }>());
export const UpdateEmployeeSuccess = createAction('[Employee] Update Employee Success', props<{ response: EmployeeModel }>());

export const DeleteEmployeeBegin = createAction('[Employee] Delete Employee Begin', props<{ id: string }>());
export const DeleteEmployeeFail = createAction('[Employee] Delete Employee Fail', props<{ error: string }>());
export const DeleteEmployeeSuccess = createAction('[Employee] Delete Employee Success', props<{ response: any }>());

export const ToggleAddDocumenForm = createAction('[Employee] Toggle Add Document Form', props<{ flag?: boolean }>());
export const ToggleRequestDocumentForm = createAction('[Employee] Toggle Request Document Form', props<{ flag?: boolean }>());

/**
 * Request a doucment from employee
 */
export const RequestDocumentBegin = createAction('[Employee] Request Document Begin', props<{ body: DocumentModel }>());
export const RequestDocumentFail = createAction('[Employee] Request Document Fail', props<{ error: string }>());
export const RequestDocumentSuccess = createAction('[Employee] Request Document Fail', props<{ response: DocumentModel }>());

/**
 * GET /profile/documents/:uid
 */
export const FetchDocumentListBegin = createAction('[Employee] Fetch Document List Begin');
export const FetchDocumentListFail = createAction('[Employee] Fetch Document List Fail', props<{ error: string }>());
export const FetchDocumentListSuccess = createAction('[Employee] Fetch Document List Success', props<{ response: any[] }>());

/**
 * Add advance payment
 */
export const AddAdvancePaymentBegin = createAction('[Employee] Add Advance Payment Begin', props<{ body: any }>());
export const AddAdvancePaymentFail = createAction('[Employee] Add Advance Payment Fail', props<{ error: any }>());
export const AddAdvancePaymentSuccess = createAction('[Employee] Add Advance Payment Success', props<{ response: any }>());

export const ToggleAdvancePaymentForm = createAction('[Employee] Toggle Advance Payment Form', props<{flag?: boolean}>());
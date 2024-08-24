import { EmployeeModel } from "@models";
import { createAction, props } from "@ngrx/store";

export const SetDocumentRequest = createAction('[Profile] Set Document Reqeust', props<{ request: { id: string, name: string } }>());
export const UnsetDocumentRequest = createAction('[Profile] Unset Document Reqeust');

export const UploadDocumentBegin = createAction('[Profile] Upload Document Begin', props<{ file: File }>());
export const UploadDocumentFail = createAction('[Profile] Upload Document Fail', props<{ error: string }>());
export const UploadDocumentSuccess = createAction('[Profile] Upload Document Success', props<{ response: any }>());

export const ToggleUpdateEmployeeForm = createAction('[Profile] Toggle Update Employee Form', props<{ isForm?: boolean }>());
export const ToggleEmployeeContactForm = createAction('[Profile] Toggle Employee Contact Form', props<{ isForm?: boolean }>());
export const ToggleProfilePhotoForm = createAction('[Profile] Toggle Profile Photo Form', props<{ isForm?: boolean }>());

export const UpdateEmployeeProfileBegin = createAction('[Profile] Update Employee Profile Begin', props<{ profile: Partial<EmployeeModel> }>());
export const UpdateEmployeeProfileFail = createAction('[Profile] Update Employee Profile Fail', props<{ error: string }>());
export const UpdateEmployeeProfileSuccess = createAction('[Profile] Update Employee Profile Success', props<{ profile: Partial<EmployeeModel> | any }>());

export const UploadProfilePhotoBegin = createAction('[Profile] Upload Profile Photo Begin', props<{ file: File }>());
export const UploadProfilePhotoFail = createAction('[Profile] Upload Profile Photo Fail', props<{ error: string }>());
export const UploadProfilePhotoSuccess = createAction('[Profile] Upload Profile Photo Success');

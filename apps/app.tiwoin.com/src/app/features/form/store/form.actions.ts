import { createAction, props } from "@ngrx/store";

export const FormSubmissionBegin = createAction('[Form] Form Submission Begin', props<{ body: any }>());
export const FormSubmissionCancel = createAction('[Form] Form Submission Cancel');
export const FormSubmissionFail = createAction('[Form] Form Submission Fail', props<{ error: string }>());
export const FormSubmissionSuccess = createAction('[Form] Form Submission Success', props<{ response: string }>());

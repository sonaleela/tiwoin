import { FormFieldType, FormModal } from "@models";
import { createAction, props } from "@ngrx/store";

export const SetActiveForm = createAction('[Form] Set Active Form', props<{ form: FormModal }>());
export const SetActiveField = createAction('[Form] Set Active Field', props<{ field: Partial<FormFieldType> }>());
export const UnsetActiveField = createAction('[Form] Unset Active Field');
export const SaveField = createAction('[Form] Save Field', props<{ field: FormFieldType }>());
export const CopyField = createAction('[Form] Copy Field', props<{ field: FormFieldType }>());
export const DeleteField = createAction('[Form] Delete Field', props<{ field: FormFieldType }>());

export const AddFormBegin = createAction('[Form] Add Form Begin', props<{ body: any }>());
export const AddFormFail = createAction('[Form] Add Form Fail', props<{ error: string }>());
export const AddFormSuccess = createAction('[Form] Add Form Success', props<{ response: any }>());

export const DeleteFormBegin = createAction('[Form] Delete Form Begin', props<{ id: string }>());
export const DeleteFormFail = createAction('[Form] Delete Form Fail', props<{ error: string }>());
export const DeleteFormSuccess = createAction('[Form] Delete Form Success');

export const UpdateFormBegin = createAction('[Form] Update Form Begin', props<{ body: any }>());
export const UpdateFormFail = createAction('[Form] Update Form Fail', props<{ error: any }>());
export const UpdateFormSuccess = createAction('[Form] Update Form Success', props<{ response: any }>());

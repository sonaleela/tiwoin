import { createAction, props } from "@ngrx/store";

export const UpdateFormDataBegin = createAction('[Data] Update Form Data Begin', props<{ data: any }>());
export const UpdateFormDataFail = createAction('[Data] Update Form Data Fail', props<{ error: any }>());
export const UpdateFormDataSuccess = createAction('[Data] Update Form Data Success', props<{ response: any }>());

export const UpdateWorkItemDataBegin = createAction('[Data] Update Work Item Data Begin', props<{ data: any }>());
export const UpdateWorkItemDataFail = createAction('[Data] Update Work Item Data Fail', props<{ error: any }>());
export const UpdateWorkItemDataSuccess = createAction('[Data] Update Work Item Data Success', props<{ response: any }>());

export const ApproveFormDataBegin = createAction('[Data] Approve Form Data Begin', props<{ data: any }>());
export const ApproveFormDataFail = createAction('[Data] Approve Form Data Fail', props<{ error: any }>());
export const ApproveFormDataSuccess = createAction('[Data] Approve Form Data Success', props<{ response: any }>());

export const ApproveWorkItemDataBegin = createAction('[Data] Approve Work Item Data Begin', props<{ data: any }>());
export const ApproveWorkItemDataFail = createAction('[Data] Approve Work Item Data Fail', props<{ error: any }>());
export const ApproveWorkItemDataSuccess = createAction('[Data] Approve Work Item Data Success', props<{ response: any }>());

export const AddTimesheetDataBegin = createAction('[Data] Add Timesheet Data Begin', props<{ data: any }>());
export const AddTimesheetDataFail = createAction('[Data] Add Timesheet Data Fail', props<{ error: any }>());
export const AddTimesheetDataSuccess = createAction('[Data] Add Timesheet Data Success', props<{ response: any }>());

export const UpdateTimesheetDataBegin = createAction('[Data] Update Timesheet Data Begin', props<{ data: any }>());
export const UpdateTimesheetDataFail = createAction('[Data] Update Timesheet Data Fail', props<{ error: any }>());
export const UpdateTimesheetDataSuccess = createAction('[Data] Update Timesheet Data Success', props<{ response: any }>());

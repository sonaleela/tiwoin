import { createAction, props } from "@ngrx/store";
import { TimesheetModel } from "@models";

export const AddTimesheetBegin = createAction('[Timesheet] Add Timesheet Begin', props<{ body: TimesheetModel }>());
export const AddTimesheetFail = createAction('[Timesheet] Add Timesheet Fail', props<{ error: string }>());
export const AddTimesheetSuccess = createAction('[Timesheet] Add Timesheet Success');

export const UpdateTimesheetBegin = createAction('[Timesheet] Update Timesheet Begin', props<{ timesheet: TimesheetModel }>());
export const UpdateTimesheetFail = createAction('[Timesheet] Update Timesheet Fail', props<{ error: string }>());
export const UpdateTimesheetSuccess = createAction('[Timesheet] Update Timesheet Success', props<{ response: TimesheetModel }>());

export const DeleteTimesheetBegin = createAction('[Timesheet] Delete Timesheet Begin', props<{ id: string }>());
export const DeleteTimesheetFail = createAction('[Timesheet] Delete Timesheet Fail', props<{ error: string }>());
export const DeleteTimesheetSuccess = createAction('[Timesheet] Delete Timesheet Success', props<{ response: any }>());

import { createAction, props } from "@ngrx/store";

export const FetchTimesheetListBegin = createAction('[Timesheet] Fetch Timesheet List Begin', props<{ filter: any }>());
export const FetchTimesheetListFail = createAction('[Timesheet] Fetch Timesheet List Fail', props<{ error: string }>());
export const FetchTimesheetListSuccess = createAction('[Timesheet] Fetch Timesheet List Success', props<{ response: any[] }>());

export const ClockEntryBegin = createAction('[Timesheet] Clock Entry Begin', props<{ body: any }>());
export const ClockEntryCancel = createAction('[Timesheet] Clock Entry Cancel');
export const ClockEntryFail = createAction('[Timehseet] Clock Entry Fail', props<{ error: string }>());
export const ClockEntrySuccess = createAction('[Timesheet] Clock Entry Success', props<{ response: any }>());

export const FetchClockEntryBegin = createAction('[Timesheet] Fetch Clock Entry Begin');
export const FetchClockEntryFail = createAction('[Timesheet] Fetch Clock Entry Fail', props<{ error: string }>());
export const FetchClockEntrySuccess = createAction('[Timesheet] Fetch Clock Entry Success', props<{ response: { data: any } }>());

export const FetchEntryTypeBegin = createAction('[Timesheet] Fetch Entry Type Begin');
export const FetchEntryTypeFail = createAction('[Timesheet] Fetch Entry Type Fail', props<{ error: string }>());
export const FetchEntryTypeSuccess = createAction('[Timesheet] Fetch Entry Type Success', props<{ response: any[] }>());

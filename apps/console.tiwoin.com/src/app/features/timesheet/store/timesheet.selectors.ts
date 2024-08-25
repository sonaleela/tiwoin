import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, timesheetFeatureKey } from './timesheet.reducer';

const selectTimesheetState = createFeatureSelector<State>(timesheetFeatureKey);

export const selectIsAddTimesheetPending = createSelector(selectTimesheetState, state => state.isAddTimesheetPending);
export const selectAddTimesheetError = createSelector(selectTimesheetState, state => state.addTimesheetError);
export const selectIsEditTimesheetPending = createSelector(selectTimesheetState, state => state.isEditTimesheetPending);
export const selectEditTimesheetError = createSelector(selectTimesheetState, state => state.editTimesheetError);

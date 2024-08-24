import { createFeatureSelector, createSelector } from '@ngrx/store';

import { timesheetFeatureKey, State } from './timesheet.reducer';

const selectTimesheetState = createFeatureSelector<State>(timesheetFeatureKey);

export const selectIsFetchTimesheetListPending = createSelector(selectTimesheetState, state => state.isFetchTimesheetListPending);
export const selectFetchTimesheetListError = createSelector(selectTimesheetState, state => state.fetchTimesheetListError);
export const selectIsClockEntryPending = createSelector(selectTimesheetState, state => state.isClockEntryPending);
export const selectClockEntryError = createSelector(selectTimesheetState, state => state.clockEntryError);
export const selectClockEntry = createSelector(selectTimesheetState, state => state.clockEntry);
export const selectIsFetchClockEntryPending = createSelector(selectTimesheetState, state => state.isFetchClockEntryPending);
export const selectFetchClockEntryError = createSelector(selectTimesheetState, state => state.fetchClockEntryError);
export const selectEntryTypes = createSelector(selectTimesheetState,
    selectClockEntry,
    (state, entries) => {
        // Read last clock entry from `entry`
        const type = entries?.entry?.type;

        // If last entry type if `Out`,  then shift is over, don't show any entry type
        if (type === 'Out') {
            return [];
        }

        // If type is empty then shift is not started, let employee `Office In`
        if (!type || type === 'Break') {
            return [...(state.entryTypes?.filter(entry => entry.type === 'In'))];
        } else if (type === 'In') {
            return [
                ...(state.entryTypes?.filter(entry => entry.type === 'Break')),
                ...(state.entryTypes?.filter(entry => entry.type === 'Out')),
            ];
        }
        return [];
    }
);
export const selectIsEntryTypesPending = createSelector(selectTimesheetState, state => state.isEntryTypesPending);
export const selectEntryTypesError = createSelector(selectTimesheetState, state => state.entryTypesError);

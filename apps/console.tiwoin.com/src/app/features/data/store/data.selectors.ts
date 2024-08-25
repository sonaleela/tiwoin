import { createFeatureSelector, createSelector } from '@ngrx/store';

import { dataFeatureKey, State } from './data.reducer';

const selectDataState = createFeatureSelector<State>(dataFeatureKey);

export const selectIsUpdateFormPending = createSelector(selectDataState, state => state.isUpdateFormPending);
export const selectUpdateFormError = createSelector(selectDataState, state => state.updateFormError);

export const selectIsUpdateWorkItemPending = createSelector(selectDataState, state => state.isUpdateWorkItemPending);
export const selectUpdateWorkItemError = createSelector(selectDataState, state => state.updateWorkItemError);

export const selectIsAddTimesheetPending = createSelector(selectDataState, state => state.isAddTimesheetPending);
export const selectAddTimesheetError = createSelector(selectDataState, state => state.addTimesheetError);

export const selectIsUpdateTimesheetPending = createSelector(selectDataState, state => state.isUpdateTimesheetPending);
export const selectUpdateTimesheetError = createSelector(selectDataState, state => state.updateTimesheetError);

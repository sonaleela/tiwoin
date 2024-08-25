import { createFeatureSelector, createSelector } from '@ngrx/store';

import { workItemFeatureKey, State } from './work-item.reducer';

const selectWorkItemState = createFeatureSelector<State>(workItemFeatureKey);

export const selectIsAddWorkItemPending = createSelector(selectWorkItemState, (state) => state.isAddWorkItemPending);
export const selectAddWorkItemError = createSelector(selectWorkItemState, (state) => state.addWorkItemError);
export const selectIsEditWorkItemPending = createSelector(selectWorkItemState, state => state.isEditWorkItemPending);
export const selectEditWorkItemError = createSelector(selectWorkItemState, state => state.editWorkItemError);

export const selectIsSubmitPending = createSelector(selectWorkItemState, state => state.isSubmitPending);
export const selectSubmitError = createSelector(selectWorkItemState, state => state.submitError);

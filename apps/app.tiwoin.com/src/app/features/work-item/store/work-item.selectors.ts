import { createFeatureSelector, createSelector } from '@ngrx/store';

import { workItemFeatureKey, State } from './work-item.reducer';

const selectWorkItemState = createFeatureSelector<State>(workItemFeatureKey);

export const selectIsSubmissionPending = createSelector(selectWorkItemState, (state) => state.isSubmissionPending);
export const selectSubmissionError = createSelector(selectWorkItemState, (state) => state.submissionError);

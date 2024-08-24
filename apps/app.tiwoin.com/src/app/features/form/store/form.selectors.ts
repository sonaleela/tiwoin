import { createFeatureSelector, createSelector } from '@ngrx/store';

import { formFeatureKey, State } from './form.reducer';

const selectFormState = createFeatureSelector<State>(formFeatureKey);

export const selectIsSubmissionPending = createSelector(selectFormState, (state) => state.isSubmissionPending);
export const selectSubmissionError = createSelector(selectFormState, (state) => state.submissionError);

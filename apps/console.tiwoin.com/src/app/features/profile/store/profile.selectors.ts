import { createFeatureSelector, createSelector } from '@ngrx/store';

import { profileFeatureKey, State } from './profile.reducer';

const selectProfileState = createFeatureSelector<State>(profileFeatureKey);

export const selectIsUpdatePending = createSelector(selectProfileState, state => state.isUpdatePending);
export const selectUpdateError = createSelector(selectProfileState, state => state.updateError);

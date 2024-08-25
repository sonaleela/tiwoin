import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, userFeatureKey } from './user.reducer';

const selectUserState = createFeatureSelector<State>(userFeatureKey);

export const selectIsInvitePending = createSelector(selectUserState, state => state.isInvitePending);
export const selectInviteError = createSelector(selectUserState, state => state.inviteError);

export const selectIsUpdatePending = createSelector(selectUserState, state => state.isUpdatePending);
export const selectUpdateError = createSelector(selectUserState, state => state.updateError);

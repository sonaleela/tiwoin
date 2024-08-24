import { createFeatureSelector, createSelector } from '@ngrx/store';

import { profileItemFeatureKey, State } from './profile.reducer';

const selectProfileState = createFeatureSelector<State>(profileItemFeatureKey);

export const selectDocumentRequest = createSelector(selectProfileState, state => state.documentRequest);
export const selectIsDocumentUploadPending = createSelector(selectProfileState, state => state.isDocumentUploadPending);
export const selectDocumentUploadError = createSelector(selectProfileState, state => state.documentUploadError);

export const selectIsProfileForm = createSelector(selectProfileState, state => state.isProfileForm);
export const selectIsContactForm = createSelector(selectProfileState, state => state.isContactForm);
export const selectIsUpdateProfilePending = createSelector(selectProfileState, state => state.isUpdateProfilePending);
export const selectUpdateProfileError = createSelector(selectProfileState, state => state.updateProfileError);
export const selectIsProfilePhotoForm = createSelector(selectProfileState, state => state.isProfilePhotoForm);

export const selectIsProfilePhotoPending = createSelector(selectProfileState, state => state.isProfilePhotoPending);
export const selectProfilePhotoError = createSelector(selectProfileState, state => state.profilePhotoError);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, formFeatureKey } from './form.reducer';

const selectFormState = createFeatureSelector<State>(formFeatureKey);

export const selectIsAddFormPending = createSelector(selectFormState, state => state.isAddFormPending);
export const selectAddFormError = createSelector(selectFormState, state => state.addFormError);
export const selectIsEditFormPending = createSelector(selectFormState, state => state.isEditFormPending);
export const selectEditFormError = createSelector(selectFormState, state => state.editFormError);

export const selectActiveForm = createSelector(selectFormState, state => state.activeForm);
export const selectActiveFormField = createSelector(selectFormState, state => state.activeFormField);
export const selectActiveFormFields = createSelector(selectFormState, state => state?.activeForm?.fields || []);
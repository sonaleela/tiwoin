import { createFeatureSelector, createSelector } from '@ngrx/store';

import { employeeFeatureKey, State } from './employee.reducer';
import * as fromRootStore from '@store';

const selectEmployeeState = createFeatureSelector<State>(employeeFeatureKey);

export const selectActiveID = fromRootStore.selectRouteParam('uid');

export const selectIsAddEmployeePending = createSelector(selectEmployeeState, (state) => state.isAddEmployeePending);
export const selectAddEmployeeError = createSelector(selectEmployeeState, (state) => state.addEmployeeError);

export const selectIsUpdateEmployeePending = createSelector(selectEmployeeState, state => state.isUpdateEmployeePending);
export const selectUpdateEmployeeError = createSelector(selectEmployeeState, state => state.updateEmployeeError);

export const selectIsAddDocumentForm = createSelector(selectEmployeeState, state => state.isAddDocumentForm);
export const selectIsRequestDocumentForm = createSelector(selectEmployeeState, state => state.isRequestDocumentForm);
export const selectIsRequestDocumentPending = createSelector(selectEmployeeState, state => state.isRequestDocumentPending);
export const selectRequestDocumentError = createSelector(selectEmployeeState, state => state.requestDocumentError);

export const selectDocumentList = createSelector(selectEmployeeState, state => state.documentList);
export const selectIsDocumentListPending = createSelector(selectEmployeeState, state => state.isDocumentListPending);
export const selectDocumentListError = createSelector(selectEmployeeState, state => state.documentListError);

export const selectIsAddAdvancePaymentDataPending = createSelector(selectEmployeeState, state => state.isAddAdvancePaymentPending);
export const selectAddAdvancePaymentError = createSelector(selectEmployeeState, state => state.addAdvancePaymentError);
export const selectIsAdvancePaymentForm = createSelector(selectEmployeeState, state => state.isAdvancePaymentForm);

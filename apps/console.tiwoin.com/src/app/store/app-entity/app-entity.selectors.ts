import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectProfile } from '../app-state';

import {
    AppEntityState,
    appEntityFeatureKey,
    payrollEntityAdapter,
    payrollComponentEntityAdapter,
    employeeEntityAdapter,
    organizationEntityAdapter,
    workItemEntityAdapter,
    siteEntityAdapter,
    formEntityAdapter,
    userEntityAdapter,
    timesheetEntityAdapter,
    formDataEntityAdapter,
    payrollDataEntityAdapter,
    timesheetDataEntityAdapter,
    workItemDataEntityAdapter,
    advancePaymentDataEntityAdapter,
} from './app-entity.reducer';

const selectAppEntityState = createFeatureSelector<AppEntityState>(appEntityFeatureKey);

const selectOrganizationEntityState = createSelector(selectAppEntityState, (state) => state.organizationEntity);
const selectEmployeeEntityState = createSelector(selectAppEntityState, (state) => state.employeeEntity);
const selectPayrollEntityState = createSelector(selectAppEntityState, (state) => state.payrollEntity);
const selectPayrollComponentEntityState = createSelector(selectAppEntityState, (state) => state.payrollComponentEntity);
const selectWorkItemEntityState = createSelector(selectAppEntityState, (state) => state.workItemEntity);
const selectSiteEntityState = createSelector(selectAppEntityState, (state) => state.siteEntity);
const selectFormEntityState = createSelector(selectAppEntityState, (state) => state.formEntity);
const selectUserEntityState = createSelector(selectAppEntityState, state => state.userEntity);
const selectTimesheetEntityState = createSelector(selectAppEntityState, state => state.timesheetEntity);
const selectFormDataEntityState = createSelector(selectAppEntityState, state => state.formDataEntity);
const selectPayrollDataEntityState = createSelector(selectAppEntityState, state => state.payrollDataEntity);
const selectTimesheetDataEntityState = createSelector(selectAppEntityState, state => state.timesheetDataEntity);
const selectWorkItemDataEntityState = createSelector(selectAppEntityState, state => state.workItemDataEntity);
const selectAdvancePaymentDataEntityState = createSelector(selectAppEntityState, state => state.advancePaymentDataEntity);

/**
 * Entity selectors
 */
const organizationEntitySelector = organizationEntityAdapter.getSelectors(selectOrganizationEntityState);
const employeeEntitySelectors = employeeEntityAdapter.getSelectors(selectEmployeeEntityState);
const payrollEntitySelectors = payrollEntityAdapter.getSelectors(selectPayrollEntityState);
const payrollComponentEntitySelectors = payrollComponentEntityAdapter.getSelectors(selectPayrollComponentEntityState);
const workItemEntitySelectors = workItemEntityAdapter.getSelectors(selectWorkItemEntityState);
const siteEntitySelectors = siteEntityAdapter.getSelectors(selectSiteEntityState);
const formEntitySelectors = formEntityAdapter.getSelectors(selectFormEntityState);
const userEntitySelectors = userEntityAdapter.getSelectors(selectUserEntityState);
const timesheetEntitySelector = timesheetEntityAdapter.getSelectors(selectTimesheetEntityState);
const formDataEntitySelector = formDataEntityAdapter.getSelectors(selectFormDataEntityState);
const payrollDataEntitySelector = payrollDataEntityAdapter.getSelectors(selectPayrollDataEntityState);
const timesheetDataEntitySelector = timesheetDataEntityAdapter.getSelectors(selectTimesheetDataEntityState);
const workItemDataEntitySelector = workItemDataEntityAdapter.getSelectors(selectWorkItemDataEntityState);
const advancePaymentEntitySelector = advancePaymentDataEntityAdapter.getSelectors(selectAdvancePaymentDataEntityState);

/**
 * Organization list
 */
export const selectOrganizationList = organizationEntitySelector.selectAll;
export const selectIsOrganizationListPending = createSelector(selectOrganizationEntityState, (state) => state.isPending);
export const selectOrganizationListError = createSelector(selectOrganizationEntityState, (state) => state.error);

/**
 * Employee list
 */
export const selectEmployeeList = employeeEntitySelectors.selectAll;
const selectEmployeeEntities = employeeEntitySelectors.selectEntities;
export const selectIsFetchEmployeeListPending = createSelector(selectEmployeeEntityState, (state) => state.isPending);
export const selectFetchEmployeeListError = createSelector(selectEmployeeEntityState, (state) => state.error);
export const selectActiveEmployeeId = createSelector(selectEmployeeEntityState, (state) => state.activeId || '');
export const selectActiveEmployee = createSelector(selectEmployeeEntities, selectActiveEmployeeId, (entities, id) => entities[id] || null);
export const selectIsActiveEmployeePending = createSelector(selectEmployeeEntityState, state => state.isActiveEmployeePending);

/**
 * Payroll list
 */
export const selectPayrollList = payrollEntitySelectors.selectAll;
const selectPayrollEntities = payrollEntitySelectors.selectEntities;
export const selectIsFetchPayrollListPending = createSelector(selectPayrollEntityState, (state) => state.isPending);
export const selectFetchPayrollListError = createSelector(selectPayrollEntityState, (state) => state.error);
export const selectActivePayrollId = createSelector(selectPayrollEntityState, (state) => state.activeId || '');
export const selectActivePayroll = createSelector(selectPayrollEntities, selectActivePayrollId, (entities, id) => entities[id] || null);

/**
 * Payroll Component list
 */
export const selectPayrollComponentList = payrollComponentEntitySelectors.selectAll;
export const selectIsFetchPayrollComponentListPending = createSelector(selectPayrollComponentEntityState, (state) => state.isPending);
export const selectFetchPayrollComponentListError = createSelector(selectPayrollComponentEntityState, (state) => state.error);

/**
 * Work item list
 */
export const selectWorkItemList = workItemEntitySelectors.selectAll;
const selectWorkItemEntities = workItemEntitySelectors.selectEntities;
export const selectIsFetchWorkItemListPending = createSelector(selectWorkItemEntityState, (state) => state.isPending);
export const selectFetchWorkItemListError = createSelector(selectWorkItemEntityState, (state) => state.error);
export const selectActiveWorkItemId = createSelector(selectWorkItemEntityState, (state) => state.activeId || '');
export const selectActiveWorkItem = createSelector(selectWorkItemEntities, selectActiveWorkItemId, (entities, id) => entities[id] || null);

/**
 * Site item list
 */
export const selectSiteList = siteEntitySelectors.selectAll;
const selectSiteEntities = siteEntitySelectors.selectEntities;
export const selectIsFetchSiteListPending = createSelector(selectSiteEntityState, (state) => state.isPending);
export const selectFetchSiteListError = createSelector(selectSiteEntityState, (state) => state.error);
export const selectActiveSiteId = createSelector(selectSiteEntityState, (state) => state.activeId || '');
export const selectActiveSite = createSelector(selectSiteEntities, selectActiveSiteId, (entities, id) => entities[id] || null);

/**
 * Form list
 */
export const selectFormList = formEntitySelectors.selectAll;
const selectFormEntities = formEntitySelectors.selectEntities;
export const selectIsFormListPending = createSelector(selectFormEntityState, (state) => state.isPending);
export const selectFormListError = createSelector(selectFormEntityState, (state) => state.error);
export const selectActiveFormId = createSelector(selectFormEntityState, (state) => state.activeId || '');
export const selectActiveForm = createSelector(selectFormEntities, selectActiveFormId, (entities, id) => entities[id] || null);

/**
 * User list
 */
export const selectUserList = createSelector(userEntitySelectors.selectAll, (users) => {
    return users.filter(user => user.role !== 'OWNER');
});
const selectUserEntities = userEntitySelectors.selectEntities;
export const selectIsUserListPending = createSelector(selectUserEntityState, state => state.isPending);
export const selectUserListError = createSelector(selectUserEntityState, state => state.error);
export const selectActiveUserId = createSelector(selectUserEntityState, state => state.activeId || '');
export const selectActiveUser = createSelector(selectUserEntities, selectActiveUserId, (entities, id) => entities[id] || null);

/**
 * Timesheet list
 */
export const selectTimesheetList = timesheetEntitySelector.selectAll;
const selectTimesheetEntities = timesheetEntitySelector.selectEntities;
export const selectIsTimesheetListPending = createSelector(selectTimesheetEntityState, state => state.isPending);
export const selectTimesheetListError = createSelector(selectTimesheetEntityState, state => state.error);
export const selectActiveTimesheetId = createSelector(selectTimesheetEntityState, (state) => state.activeId || '');
export const selectActiveTimesheet = createSelector(selectTimesheetEntities, selectActiveTimesheetId, (entities, id) => entities[id] || null);

/**
 * Form data
 */
export const selectFormData = formDataEntitySelector.selectAll;
const selectFormDataEntities = formDataEntitySelector.selectEntities;
export const selectFormDataTotal = createSelector(selectFormDataEntityState, state => state.total);
export const selectFormDataFilter = createSelector(selectFormDataEntityState, state => state.filter);
export const selectIsFormDataPending = createSelector(selectFormDataEntityState, state => state.isPending);
export const selectFormDataError = createSelector(selectFormDataEntityState, state => state.error);
export const selectActiveFormDataRecordId = createSelector(selectFormDataEntityState, state => state.activeId || '');
export const selectActiveFormDataRecord = createSelector(selectFormDataEntities, selectActiveFormDataRecordId, (entities, id) => entities[id] || null);

/**
 * Payroll data
 */
export const selectPayrollData = payrollDataEntitySelector.selectAll;
export const selectPayrollDataTotal = createSelector(selectPayrollDataEntityState, state => state.total);
export const selectPayrollDataFilter = createSelector(selectPayrollDataEntityState, state => state.filter);
export const selectIsPayrollDataPending = createSelector(selectPayrollDataEntityState, state => state.isPending);
export const selectPayrollDataError = createSelector(selectPayrollDataEntityState, state => state.error);

/**
 * Timesheet data
 */
export const selectTimesheetData = timesheetDataEntitySelector.selectAll;
const selectTimesheetDataEntities = timesheetDataEntitySelector.selectEntities;
export const selectTimesheetDataTotal = createSelector(selectTimesheetDataEntityState, state => state.total);
export const selectTimesheetDataFilter = createSelector(selectTimesheetDataEntityState, state => state.filter);
export const selectIsTimesheetDataPending = createSelector(selectTimesheetDataEntityState, state => state.isPending);
export const selectTimesheetDataError = createSelector(selectTimesheetDataEntityState, state => state.error);
export const seelctActiveTimesheetDataRecordId = createSelector(selectTimesheetDataEntityState, state => state.activeId || '');
export const selectActiveTimesheetDataRecord = createSelector(selectTimesheetDataEntities, seelctActiveTimesheetDataRecordId, (entities, id) => entities[id] || null);

/**
 * Work-item data
 */
export const selectWorkItemData = workItemDataEntitySelector.selectAll;
const selectWorkItemDataEntities = workItemDataEntitySelector.selectEntities;
export const selectWorkItemDataTotal = createSelector(selectWorkItemDataEntityState, state => state.total);
export const selectWorkItemDataFilter = createSelector(selectWorkItemDataEntityState, state => state.filter);
export const selectIsWorkItemDataPending = createSelector(selectWorkItemDataEntityState, state => state.isPending);
export const selectWorkItemDataError = createSelector(selectWorkItemDataEntityState, state => state.error);
export const selectActiveWorkItemDataRecordId = createSelector(selectWorkItemDataEntityState, state => state.activeId || '');
export const selectActiveWorkItemDataRecord = createSelector(selectWorkItemDataEntities, selectActiveWorkItemDataRecordId, (entities, id) => entities[id] || null);

/**
 * Advance payment data
 */
export const selectAdvancePaymentData = advancePaymentEntitySelector.selectAll;
export const selectAdvancePaymentDataTotal = createSelector(selectAdvancePaymentDataEntityState, state => state.total);
export const selectAdvancePaymentDataFilter = createSelector(selectAdvancePaymentDataEntityState, state => state.filter);
export const selectIsAdvancePaymentDataPending = createSelector(selectAdvancePaymentDataEntityState, state => state.isPending);
export const selectAdvancePaymentDataError = createSelector(selectAdvancePaymentDataEntityState, state => state.error);

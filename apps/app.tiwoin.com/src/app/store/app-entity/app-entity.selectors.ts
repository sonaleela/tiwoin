import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectOrganization } from '../app-state';

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
    formSubmissionEntityAdapter,
    payrollDataEntityAdapter,
    timesheetDataEntityAdapter,
    workItemSubmissionEntityAdapter,
    documentEntityAdapter,
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
const selectFormSubmissionEntityState = createSelector(selectAppEntityState, state => state.formSubmissionEntity);
const selectPayrollDataEntityState = createSelector(selectAppEntityState, state => state.payrollDataEntity);
const selectTimesheetDataEntityState = createSelector(selectAppEntityState, state => state.timesheetDataEntity);
const selectWorkItemSubmissionEntityState = createSelector(selectAppEntityState, state => state.workItemSubmissionEntity);
const selectDocumentEntityState = createSelector(selectAppEntityState, state => state.documentEntity);

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
const formSubmissionEntitySelector = formSubmissionEntityAdapter.getSelectors(selectFormSubmissionEntityState);
const payrollDataEntitySelector = payrollDataEntityAdapter.getSelectors(selectPayrollDataEntityState);
const timesheetDataEntitySelector = timesheetDataEntityAdapter.getSelectors(selectTimesheetDataEntityState);
const workItemSubmissionEntitySelector = workItemSubmissionEntityAdapter.getSelectors(selectWorkItemSubmissionEntityState);
const documentEntitySelector = documentEntityAdapter.getSelectors(selectDocumentEntityState);

/**
 * Organization list
 */
export const selectOrganizationList = organizationEntitySelector.selectAll;
export const selectIsFetchOrganizationListPending = createSelector(selectOrganizationEntityState, (state) => state.isPending);
export const selectFetchOrganizationListError = createSelector(selectOrganizationEntityState, (state) => state.error);

/**
 * Employee list
 */
export const selectEmployeeList = employeeEntitySelectors.selectAll;
const selectEmployeeEntities = employeeEntitySelectors.selectEntities;
export const selectIsFetchEmployeeListPending = createSelector(selectEmployeeEntityState, (state) => state.isPending);
export const selectFetchEmployeeListError = createSelector(selectEmployeeEntityState, (state) => state.error);
export const selectActiveEmployeeId = createSelector(selectEmployeeEntityState, (state) => state.activeId || '');
export const selectActiveEmployee = createSelector(selectEmployeeEntities, selectActiveEmployeeId, (entities: { [key: string]: any }, id: string) => entities[id] || null);

/**
 * Payroll list
 */
export const selectPayrollList = payrollEntitySelectors.selectAll;
const selectPayrollEntities = payrollEntitySelectors.selectEntities;
export const selectIsFetchPayrollListPending = createSelector(selectPayrollEntityState, (state) => state.isPending);
export const selectFetchPayrollListError = createSelector(selectPayrollEntityState, (state) => state.error);
export const selectActivePayrollId = createSelector(selectPayrollEntityState, (state) => state.activeId || '');
export const selectActivePayroll = createSelector(selectPayrollEntities, selectActivePayrollId, (entities: { [key: string]: any }, id: string) => entities[id] || null);

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
export const selectActiveWorkItem = createSelector(selectWorkItemEntities, selectActiveWorkItemId, (entities: { [key: string]: any }, id: string) => entities[id] || null);

/**
 * Site item list
 */
export const selectSiteList = siteEntitySelectors.selectAll;
const selectSiteEntities = siteEntitySelectors.selectEntities;
export const selectIsFetchSiteListPending = createSelector(selectSiteEntityState, (state) => state.isPending);
export const selectFetchSiteListError = createSelector(selectSiteEntityState, (state) => state.error);
export const selectActiveSiteId = createSelector(selectSiteEntityState, (state) => state.activeId || '');
export const selectActiveSite = createSelector(selectSiteEntities, selectActiveSiteId, (entities: { [key: string]: any }, id: string) => entities[id] || null);

/**
 * Form list
 */
export const selectFormList = formEntitySelectors.selectAll;
const selectFormEntities = formEntitySelectors.selectEntities;
export const selectIsFormListPending = createSelector(selectFormEntityState, (state) => state.isPending);
export const selectFormListError = createSelector(selectFormEntityState, (state) => state.error);
export const selectActiveFormId = createSelector(selectFormEntityState, (state) => state.activeId || '');
export const selectActiveForm = createSelector(selectFormEntities, selectActiveFormId, (entities: { [key: string]: any }, id: string) => entities[id] || null);

/**
 * User list
 */
export const selectUserList = createSelector(userEntitySelectors.selectAll, selectOrganization, (users: any[], organization) => {
    return users.map((user: any) => {
        return { ...user, organization: user?.organizations.find((org: any) => org?.id === organization?.id) }
    })
});
const selectUserEntities = userEntitySelectors.selectEntities;
export const selectIsUserListPending = createSelector(selectUserEntityState, state => state.isPending);
export const selectUserListError = createSelector(selectUserEntityState, state => state.error);
export const selectActiveUserId = createSelector(selectUserEntityState, state => state.activeId || '');
export const selectActiveUser = createSelector(selectUserEntities, selectActiveUserId, (entities: { [key: string]: any }, id: string) => entities[id] || null);

/**
 * Timesheet list
 */
export const selectTimesheetList = timesheetEntitySelector.selectAll;
const selectTimesheetEntities = timesheetEntitySelector.selectEntities;
export const selectIsTimesheetListPending = createSelector(selectTimesheetEntityState, state => state.isPending);
export const selectTimesheetListError = createSelector(selectTimesheetEntityState, state => state.error);
export const selectActiveTimesheetId = createSelector(selectTimesheetEntityState, (state) => state.activeId || '');
export const selectActiveTimesheet = createSelector(selectTimesheetEntities, selectActiveTimesheetId, (entities: { [key: string]: any }, id: string) => entities[id] || null);

/**
 * Form data
 */
export const selectFormSubmission = formSubmissionEntitySelector.selectAll;
const selectFormSubmissionEntities = formSubmissionEntitySelector.selectEntities;
export const selectFormSubmisstionFilter = createSelector(selectFormSubmissionEntityState, state => state.filter);
export const selectIsFormSubmissionPending = createSelector(selectFormSubmissionEntityState, state => state.isPending);
export const selectFormSubmissionError = createSelector(selectFormSubmissionEntityState, state => state.error);
export const selectActiveFormSubmissionId = createSelector(selectFormSubmissionEntityState, state => state.activeId || '');
export const selectActiveFormSubmission = createSelector(selectFormSubmissionEntities, selectActiveFormSubmissionId, (entities: { [key: string]: any }, id: string) => entities[id] || null);
/**
 * Payroll data
 */
export const selectPayrollData = payrollDataEntitySelector.selectAll;
export const selectIsPayrollDataPending = createSelector(selectPayrollDataEntityState, state => state.isPending);
export const selectPayrollDataError = createSelector(selectPayrollDataEntityState, state => state.error);

/**
 * Timesheet data
 */
export const selectTimesheetSubmission = timesheetDataEntitySelector.selectAll;
export const selectTimesheetSubmissionFilter = createSelector(selectTimesheetDataEntityState, state => state.filter);
export const selectIsTimesheetSubmissionPending = createSelector(selectTimesheetDataEntityState, state => state.isPending);
export const selectTimesheetSubmissionError = createSelector(selectTimesheetDataEntityState, state => state.error);

/**
 * Work-item data
 */
export const selectWorkItemSubmission = workItemSubmissionEntitySelector.selectAll;
export const selectWorkItemSubmissionFilter = createSelector(selectWorkItemSubmissionEntityState, state => state.filter);
export const selectIsWorkItemSubmissionPending = createSelector(selectWorkItemSubmissionEntityState, state => state.isPending);
export const selectWorkItemSubmissionError = createSelector(selectWorkItemSubmissionEntityState, state => state.error);

/**
 * Document list data
 */
export const selectDocumentList = documentEntitySelector.selectAll;
const selectDocumentEntities = documentEntitySelector.selectEntities;
export const selectIsDocumentListPending = createSelector(selectDocumentEntityState, state => state.isPending);
export const selectDocumentListError = createSelector(selectDocumentEntityState, state => state.error);
export const selectActiveDocumentId = createSelector(selectDocumentEntityState, state => state.activeId || '');
export const selectActiveDocument = createSelector(selectDocumentEntities, selectActiveDocumentId, (entities: { [key: string]: any }, id: string) => entities[id] || null)

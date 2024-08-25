import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, onboardingFeatureKey } from './onboarding.reducer';

const selectOnboardingState = createFeatureSelector<State>(onboardingFeatureKey);

export const selectCurrentStep = createSelector(selectOnboardingState, (state) => state.currentStep);
export const selectIsCreateOrganizationPending = createSelector(selectOnboardingState, (state) => state.isCreateOrganizationPending);
export const selectCreateOrganizationError = createSelector(selectOnboardingState, (state) => state.createOrganizationError);
export const selectCreateOrganizationResponse = createSelector(selectOnboardingState, (state) => state.createOrganizationResponse);
export const selectOrganizationId = createSelector(selectCreateOrganizationResponse, (org) => org?.id);
export const selectCreateSitePending = createSelector(selectOnboardingState, (state) => state.isCreateSitePending);
export const selectCreateSiteError = createSelector(selectOnboardingState, (state) => state.createSiteError);

export const selectSiteGeoFence = createSelector(selectOnboardingState, state => state.geoFence);

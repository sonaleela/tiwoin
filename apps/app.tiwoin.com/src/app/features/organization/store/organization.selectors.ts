import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, organizationFeatureKey } from './organization.reducer';

const selectOrganizationState = createFeatureSelector<State>(organizationFeatureKey);


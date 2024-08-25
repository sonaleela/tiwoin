import { createFeatureSelector, createSelector } from '@ngrx/store';

import { siteFeatureKey, State } from './site.reducer';

const selectSiteState = createFeatureSelector<State>(siteFeatureKey);

export const selectIsAddSitePending = createSelector(selectSiteState, (state) => state.isAddSitePending);
export const selectAddSiteError = createSelector(selectSiteState, (state) => state.addSiteError);
export const selectIsEditSitePending = createSelector(selectSiteState, (state) => state.isEditSitePending);
export const selectEditSiteError = createSelector(selectSiteState, (state) => state.editSiteError);

export const selectSiteGeoFence = createSelector(selectSiteState, state => state.geoFence);

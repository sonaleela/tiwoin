import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppConfigState, appConfigFeatureKey } from './app-config.reducer';

const selectAppConfigState = createFeatureSelector<AppConfigState>(appConfigFeatureKey);

export const selectConfig = createSelector(selectAppConfigState, (state) => state.config);
export const selectIsConfigLoaded = createSelector(selectAppConfigState, (state) => state.isConfigLoaded);
export const selectIsInitPending = createSelector(selectAppConfigState, (state) => state.isInitPending);

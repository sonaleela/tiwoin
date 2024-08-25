import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appFeatureKey, AppState } from './app.reducer';

const selectAppState = createFeatureSelector<AppState>(appFeatureKey);

export const selectProfile = createSelector(selectAppState, (state) => state.profile);
export const selectDateFormat = createSelector(selectProfile, profile => profile?.dateFormat || 'MMM dd, yyyy');
export const selectTimeFormat = createSelector(selectProfile, profile => profile?.timeFormat || 'HH:mm');
export const selectLongDateFormat = createSelector(selectProfile, profile => 'MMM dd, yyyy HH:mm');
export const selectOrganization = createSelector(selectAppState, state => state.organization);

export const selectDeviceGeoLocation = createSelector(selectAppState, state => state.deviceGeoLocation);
export const selectAddressGeolocation = createSelector(selectAppState, state => state.addressGeoLocation);

export const selectCountryName = createSelector(selectAppState, state => (state.postalData.length) ? state.postalData[0].Country : '');
export const selectStateName = createSelector(selectAppState, state => (state.postalData.length) ? state.postalData[0].State : '');
export const selectCityList = createSelector(selectAppState, state => state.postalData.map(data => data?.Name));

export const selectSidenavState = createSelector(selectAppState, state => state.sidenavState);

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appFeatureKey, AppState } from './app-state.reducer';

const selectAppState = createFeatureSelector<AppState>(appFeatureKey);

export const selectProfile = createSelector(selectAppState, (state) => state.profile);
export const selectOrganization = createSelector(selectAppState, state => state.organization);
export const selectSite = createSelector(selectAppState, state => state.site);
export const selectSidenavState = createSelector(selectAppState, state => state.sidenavState);

export const selectEmployeeProfile = createSelector(selectAppState, state => state.employeeProfile);
export const selectIsEmployeeProfilePending = createSelector(selectAppState, state => state.isEmployeeProfilePending);
export const selectEmployeeProfileError = createSelector(selectAppState, state => state.employeeProfileError);

export const selectDeviceGeoLocation = createSelector(selectAppState, state => getGeoJson(state.deviceGeoLocation));
export const selectIsLocationOff = createSelector(selectAppState, state => state.isLocationOff);
export const selectIsOffline = createSelector(selectAppState, state => state.isOffline);

/**
 * Return Geo Json
 * @param point Point
 * @returns 
 */
function getGeoJson(point: { lat: number, lng: number }): object | null {
    if (!point?.lat && !point?.lng) return null;
    return {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: 'Point',
                    coordinates: [point.lng, point.lat]
                }
            }
        ]
    };
}
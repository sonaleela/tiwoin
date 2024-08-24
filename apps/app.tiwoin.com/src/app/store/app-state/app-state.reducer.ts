import { SiteModel, OrganizationModel, ProfileModel, EmployeeModel } from '@models';
import { createReducer, on } from '@ngrx/store';

import * as fromActions from './app-state.actions';

export const appFeatureKey = 'appState';

export interface AppState {
    profile: ProfileModel | null;
    isProfilePending: boolean;
    profileError: string;

    organization: OrganizationModel | null;
    site: SiteModel | null;
    sidenavState: boolean;

    employeeProfile: EmployeeModel | null;
    isEmployeeProfilePending: boolean | null;
    employeeProfileError: string | null;

    deviceGeoLocation: { lat: number, lng: number },
    isLocationOff: boolean,
    isOffline: boolean,
}

const intialAppState: AppState = {
    profile: null,
    isProfilePending: false,
    profileError: '',

    organization: null,
    site: null,
    sidenavState: false,

    employeeProfile: null,
    isEmployeeProfilePending: null,
    employeeProfileError: '',

    deviceGeoLocation: { lat: 0, lng: 0 },
    isLocationOff: false,
    isOffline: false,
};

export const appReducer = createReducer(
    intialAppState,
    on(fromActions.FetchProfileSuccess, (state, props) => ({ ...state, profile: props?.profile, isProfilePending: false, profileError: '', })),

    on(fromActions.ToggleSidenav, (state, props) => ({ ...state, sidenavState: props?.state !== undefined ? props.state : !state.sidenavState })),
    on(fromActions.SetAppOrganization, (state, props) => ({ ...state, organization: props.organization })),
    on(fromActions.SetAppSite, (state, props) => ({ ...state, site: props.site })),

    on(fromActions.FetchEmployeeProfileBegin, (state) => ({ ...state, isEmployeeProfilePending: true, employeeProfileError: '' })),
    on(fromActions.FetchEmployeeProfileFail, (state, props) => ({ ...state, isEmployeeProfilePending: false, employeeProfileError: props.error })),
    on(fromActions.FetchEmployeeProfileSuccess, (state, props) => ({ ...state, employeeProfile: props?.employee, isEmployeeProfilePending: false, employeeProfileError: '' })),
    on(fromActions.SetEmployeeProfile, (state, props) => ({ ...state, employeeProfile: { ...state.employeeProfile, ...props.profile } })),

    on(fromActions.DeviceGeoLocationUpdate, (state, props) => ({ ...state, deviceGeoLocation: { lat: props.lat, lng: props.lng }, isLocationOff: false, })),
    on(fromActions.DeviceGeoLocationGranted, (state, props) => ({ ...state, isLocationOff: false, })),
    on(fromActions.DeviceGeoLocationDenied, (state, props) => ({ ...state, isLocationOff: true, })),
    on(fromActions.DeviceGeoLocationError, (state, props) => ({ ...state, })),

    on(fromActions.InternetStatusOffline, (state, props) => ({ ...state, isOffline: props?.isOffline ?? false })),
);

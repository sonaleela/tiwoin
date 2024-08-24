import { SiteModel } from "@models";
import { createAction, props } from "@ngrx/store";

// Navigation back
export const Back = createAction('[App] Back');

// Fetch profile
export const FetchProfileBegin = createAction('[App] Fetch Profile Begin');
export const FetchProfileFail = createAction('[App] Fetch Profile Fail', props<{ error: string }>());
export const FetchProfileSuccess = createAction('[App] Fetch Profile Success', props<{ profile: any }>());

// Set default organization on the profie(user)
export const SetDefaultOrganizationBegin = createAction('[App] Set Default Organization Begin', props<{ organizationId: string }>());
export const SetDefaultOrganizationFail = createAction('[App] Set Default Organization Fail', props<{ error: string }>());
export const SetDefaultOrganizationSuccess = createAction('[App] Set Default Organization Success');

export const SetAppOrganization = createAction('[App] Set App Organization', props<{ organization: any }>());
export const SetAppSite = createAction('[App] Set Default Site', props<{ site: SiteModel }>());
export const ToggleSidenav = createAction('[App] Toggle Sidenav', props<{ state?: boolean }>());

// App location
export const DeviceGeoLocationBegin = createAction('[App] Device Geo Location Begin');
export const DeviceGeoLocationError = createAction('[App] Device Geo Location Error', props<{ error: any }>());
export const DeviceGeoLocationDenied = createAction('[App] Device Geo Location Denied');
export const DeviceGeoLocationGranted = createAction('[App] Device Geo Location Granted');
export const DeviceGeoLocationUpdate = createAction('[App] Device Geo Location Update', props<{ lat: number, lng: number }>());

// Check internet status
export const InternetStatusBegin = createAction('[App] Internet Status Begin');
export const InternetStatusOffline = createAction('[App] Internet Status Offline', props<{ isOffline: boolean }>());

// Fetch current logged in User's Employee record based on user(from token) and organization id
// We need employee ID to fetch document list and other APIs
export const FetchEmployeeProfileBegin = createAction('[App] Fetch Employee Profile Begin');
export const FetchEmployeeProfileFail = createAction('[App] Fetch Employee Profile Fail', props<{ error: string }>());
export const FetchEmployeeProfileSuccess = createAction('[App] Fetch Employee Profile Success', props<{ employee: any }>());
export const SetEmployeeProfile = createAction('[App] Set Employee Profile', props<{ profile: any }>());

import { createAction, props } from '@ngrx/store';
import { PostalData } from '@models';

export const ProfileRequestBegin = createAction('[App] Profile Request Begin');
export const ProfileReqeustFail = createAction('[App] Profile Request Fail', props<{ error: string }>());
export const ProfileRequestSuccess = createAction('[App] Profile Request Success', props<{ profile: any }>());

// Set default organization on the profie(user)
export const SetDefaultOrganizationBegin = createAction('[App] Set Default Organization Begin', props<{ organizationId: string }>());
export const SetDefaultOrganizationFail = createAction('[App] Set Default Organization Fail', props<{ error: string }>());
export const SetDefaultOrganizationSuccess = createAction('[App] Set Default Organization Success');

// Set organization at app level
export const SetAppOrganization = createAction('[App] Set App Organization', props<{ organization: any }>());

// App location
export const DeviceGeoLocationBegin = createAction('[App] Device Geo Location Begin');
export const DeviceGeoLocationError = createAction('[App] Device Geo Location Error', props<{ error: any }>());
export const DeviceGeoLocationUpdate = createAction('[App] Device Geo Location Update', props<{ lat: number, lng: number }>());

// Geolocation of an user input address
export const AddressGeolocationBegin = createAction('[Site] Address Geolocation Begin', props<{ payload: { address: string, postalCode: string } }>());
export const AddressGeolocationFail = createAction('[Site] Address  Geolocation Fail', props<{ error: string }>());
export const AddressGeolocationSuccess = createAction('[Site] Address Geolocation Success', props<{ lat: number, lng: number }>());

// Fetch postal data based on PINCODE
export const FetchPostalDataBegin = createAction('[Site] Fetch Postal Data Begin', props<{ pincode: string }>());
export const FetchPostalDataFail = createAction('[Site] Fetch Postal Data Fail', props<{ error: string }>());
export const FetchPostalDataSuccess = createAction('[Site] Fetch Postal Data Success', props<{ postalData: PostalData[] }>());

// Toggle sidenav visiblity
export const ToggleSidenav = createAction('[App] Toggle Sidenav', props<{ state?: 'FULL' | 'MINI' }>());

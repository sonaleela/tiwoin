import { OrganizationModel, PostalData } from '@models';
import { createReducer, on } from '@ngrx/store';

import * as fromActions from './app.actions';

export const appFeatureKey = 'appState';

export interface AppState {
    profile: { id: string; firstName: string, lastName: string, dateFormat: string, timeFormat: string } | null;
    organization: OrganizationModel | null;
    isFetchProfilePending: boolean;
    fetchProfileError: string;

    isPostalDataPending: boolean;
    postalDataError: string;
    postalData: PostalData[],

    deviceGeoLocation: { lat: number, lng: number },
    addressGeoLocation: { lat: number | null, lng: number | null },

    sidenavState: 'FULL' | 'MINI';
}

const intialAppState: AppState = {
    profile: null,
    organization: null,
    isFetchProfilePending: false,
    fetchProfileError: '',

    isPostalDataPending: false,
    postalDataError: '',
    postalData: [],

    deviceGeoLocation: { lat: 0, lng: 0 },
    addressGeoLocation: { lat: 0, lng: 0 },
    sidenavState: 'FULL',
};

export const appReducer = createReducer(
    intialAppState,
    on(fromActions.ProfileRequestSuccess, (state, props) => ({ ...state, profile: props.profile, })),
    on(fromActions.SetAppOrganization, (state, props) => ({ ...state, organization: props.organization })),
    on(fromActions.DeviceGeoLocationUpdate, (state, props) => ({ ...state, deviceGeoLocation: { lat: props.lat, lng: props.lng } })),
    on(fromActions.AddressGeolocationSuccess, (state, props) => ({ ...state, addressGeoLocation: { ...props } })),

    on(fromActions.FetchPostalDataBegin, state => ({ ...state, isPostalDataPending: true, postalDataError: '' })),
    on(fromActions.FetchPostalDataFail, state => ({ ...state, isPostalDataPending: false, postalDataError: '' })),
    on(fromActions.FetchPostalDataSuccess, (state, props) => ({ ...state, isPostalDataPending: false, postalData: props?.postalData })),

    on(fromActions.ToggleSidenav, (state, props) => ({ ...state, sidenavState: props.state || 'FULL' }))
);

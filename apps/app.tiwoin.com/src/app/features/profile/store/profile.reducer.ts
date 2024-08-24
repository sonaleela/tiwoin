import { createReducer, on } from '@ngrx/store';

import * as fromActions from './profile.actions';

export const profileItemFeatureKey = 'profile';

export interface State {
    documentRequest: { id: string, name: string } | null;

    isDocumentUploadPending: boolean;
    documentUploadError: string;

    isUpdateProfilePending: boolean | null;
    updateProfileError: string | null;

    isProfileForm: boolean | null;
    isContactForm: boolean | null;
    isProfilePhotoForm: boolean | null;

    isProfilePhotoPending: boolean | null;
    profilePhotoError: string | null;
}
const initialState: State = {
    documentRequest: null,

    isDocumentUploadPending: false,
    documentUploadError: '',

    isUpdateProfilePending: null,
    updateProfileError: null,

    isProfileForm: null,
    isContactForm: null,
    isProfilePhotoForm: null,

    isProfilePhotoPending: null,
    profilePhotoError: null,
};

export const reducer = createReducer(
    initialState,
    on(fromActions.SetDocumentRequest, (state, props) => ({ ...state, documentRequest: props.request })),
    on(fromActions.UnsetDocumentRequest, (state) => ({ ...state, documentRequest: null })),

    on(fromActions.UploadDocumentBegin, state => ({ ...state, isDocumentUploadPending: true, documentUploadError: '' })),
    on(fromActions.UploadDocumentFail, (state, props) => ({ ...state, isDocumentUploadPending: false, documentUploadError: props.error })),
    on(fromActions.UploadDocumentSuccess, state => ({ ...state, isDocumentUploadPending: false, documentRequest: null, documentUploadError: '' })),

    on(fromActions.ToggleUpdateEmployeeForm, (state, props) => ({ ...state, isProfileForm: props?.isForm ?? !state.isProfileForm })),
    on(fromActions.ToggleEmployeeContactForm, (state, props) => ({ ...state, isContactForm: props?.isForm ?? !state.isContactForm })),
    on(fromActions.UpdateEmployeeProfileBegin, state => ({ ...state, isUpdateProfilePending: true, updateProfileError: null })),
    on(fromActions.UpdateEmployeeProfileFail, (state, props) => ({ ...state, isUpdateProfilePending: false, updateProfileError: props.error })),
    on(fromActions.UpdateEmployeeProfileSuccess, (state) => ({ ...state, isUpdateProfilePending: false, updateProfileError: null })),

    on(fromActions.ToggleProfilePhotoForm, (state, props) => ({ ...state, isProfilePhotoForm: props?.isForm ?? !state.isProfilePhotoForm })),
    on(fromActions.UploadProfilePhotoBegin, (state) => ({ ...state, isProfilePhotoPending: true, profilePhotoError: '' })),
    on(fromActions.UploadProfilePhotoFail, (state, props) => ({ ...state, isProfilePhotoPending: false, profilePhotoError: props.error })),
    on(fromActions.UploadProfilePhotoSuccess, (state) => ({ ...state, isProfilePhotoPending: false, isProfilePhotoForm: false })),
);

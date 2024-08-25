import { OrganizationModel, PostalData } from '@models';
import { createReducer, on } from '@ngrx/store';

import * as fromActions from './onboarding.actions';

export const onboardingFeatureKey = 'onboarding';

export enum OnboardingSteps {
    'CREATE_ORGANIZATION' = 1,
    'CREATE_SITE' = 2,
    'COMPLETE' = 3,
}

export interface State {
    currentStep: OnboardingSteps;
    isCreateOrganizationPending: boolean;
    createOrganizationError: string;
    createOrganizationResponse: OrganizationModel | null;
    isCreateSitePending: boolean;
    createSiteError: string;

    geoFence: null | any,

    isUpdateInvitationPending: boolean;
    updateInvitationError: string;
}

const initialState: State = {
    currentStep: OnboardingSteps.CREATE_ORGANIZATION,
    isCreateOrganizationPending: false,
    createOrganizationError: '',
    createOrganizationResponse: null,
    isCreateSitePending: false,
    createSiteError: '',

    geoFence: null,

    isUpdateInvitationPending: false,
    updateInvitationError: '',
};

export const reducer = createReducer(
    initialState,
    on(fromActions.CreateOrganizationBegin, (state) => ({ ...state, isCreateOrganizationPending: true, createOrganizationError: '', })),
    on(fromActions.CreateOrganizationFail, (state, props) => ({ ...state, isCreateOrganizationPending: false, createOrganizationError: props.error, })),
    on(fromActions.CreateOrganizationSuccess, (state, props) => ({ ...state, isCreateOrganizationRequestPending: false, currentStep: OnboardingSteps.CREATE_SITE, createOrganizationResponse: props.response, })),

    on(fromActions.CreateSiteBegin, (state) => ({ ...state, isCreateSitePending: true, createSiteError: '', })),
    on(fromActions.CreateSiteFail, (state, props) => ({ ...state, isCreateSitePending: false, createSiteError: props.error, })),
    on(fromActions.CreateSiteSuccess, (state) => ({ ...state, isCreateSitePending: false, createSiteError: '', currentStep: OnboardingSteps.COMPLETE, })),
    on(fromActions.CreateSiteCancel, state => ({ ...state, isCreateSitePending: false, createSiteError: '' })),

    on(fromActions.UpdateInvitationBegin, state => ({ ...state, isUpdateInvitationPending: true, updateInvitationError: '' })),
    on(fromActions.UpdateInvitationFail, (state, props) => ({ ...state, isUpdateInvitationPending: false, updateInvitationError: props.error })),
    on(fromActions.UpdateInvitationSuccess, state => ({ ...state, isUpdateInvitationPending: false, updateInvitationError: '' })),

    on(fromActions.OnboardingComplete, (state) => ({ ...initialState, })),

    on(fromActions.SetGeoFence, (state, props) => ({ ...state, geoFence: props.geoJson }))
);

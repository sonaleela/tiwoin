import { createAction, props } from '@ngrx/store';
import { OrganizationModel, PostalData, SiteModel } from '@models';

export const CreateOrganizationBegin = createAction('[Onboarding] Create Organization Begin', props<{ body: OrganizationModel }>());
export const CreateOrganizationFail = createAction('[Onboarding] Create Organization Fail', props<{ error: string }>());
export const CreateOrganizationSuccess = createAction('[Onboarding] Create Organization Success', props<{ response: OrganizationModel }>());

export const CreateSiteBegin = createAction('[Onboarding] Create Site Begin', props<{ body: Partial<SiteModel> }>());
export const CreateSiteFail = createAction('[Onboarding] Create Site Fail', props<{ error: string }>());
export const CreateSiteSuccess = createAction('[Onboarding] Create Site Success');
export const CreateSiteCancel = createAction('[Onboarding] Create Site Cancel');

export const UpdateInvitationBegin = createAction('[Onboarding] Update Invitation Begin', props<{ body: {id: string, isAccepted: boolean } }>());
export const UpdateInvitationFail = createAction('[Onboarding] Update Invitation Fail', props<{ error: any }>());
export const UpdateInvitationSuccess = createAction('[Onboarding] Update Invitation Success');

export const OnboardingComplete = createAction('[Onboarding] Onboarding Complete');

export const SetGeoFence = createAction('[Onboarding] Set Geo Fence', props<{ geoJson: any }>());

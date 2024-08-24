import { createAction, props } from '@ngrx/store';

export const UpdateInvitationBegin = createAction('[Onboarding] Update Invitation Begin', props<{ body: {id: string, isAccepted: boolean } }>());
export const UpdateInvitationFail = createAction('[Onboarding] Update Invitation Fail', props<{ error: any }>());
export const UpdateInvitationSuccess = createAction('[Onboarding] Update Invitation Success');

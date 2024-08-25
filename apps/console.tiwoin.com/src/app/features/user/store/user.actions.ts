import { createAction, props } from '@ngrx/store';

export const InviteUserBegin = createAction('[User] Invite User Begin', props<{ user: any }>());
export const InviteUserFail = createAction('[User] Invite User Fail', props<{ error: string }>());
export const InviteUserSuccess = createAction('[User] Invite User Success', props<{ response: any }>());

export const UpdateInvitedUserBegin = createAction('[User] Update Invited User Begin', props<{ user: any }>());
export const UpdateInvitedUserFail = createAction('[User] Update Invited User Fail', props<{ error: string }>());
export const UpdateInvitedUserSuccess = createAction('[User] Update Invited User Success', props<{ response: any }>());

export const DeleteInvitedUserBegin = createAction('[User] Delete Invited User Begin', props<{ id: string }>());
export const DeleteInvitedUserFail = createAction('[User] Delete Invited User Fail', props<{ error: string }>());
export const DeleteInvitedUserSuccess = createAction('[User] Delete Invited User Success', props<{ response: any }>());

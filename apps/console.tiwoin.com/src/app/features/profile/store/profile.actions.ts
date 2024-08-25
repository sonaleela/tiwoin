import { createAction, props } from '@ngrx/store';

export const UpdateProfileBegin = createAction('[Profile] Update Profile Begin', props<{ profile: any }>());
export const UpdateProfileFail = createAction('[Profile] Update Profile Fail', props<{ error: any }>());
export const UpdateProfileSuccess = createAction('[Profile] Update Profile Success ', props<{ profile: any }>());

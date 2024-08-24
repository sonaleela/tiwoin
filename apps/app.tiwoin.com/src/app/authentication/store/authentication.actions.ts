import { createAction, props } from "@ngrx/store";
import { ProfileModel, SignupPayloadModel } from "@models";

export const ResetAuthInfo = createAction('[Authentication] Reset Auth Info');

export const SigninBegin = createAction('[Authentication] Signin Begin', props<{ username: string; }>());
export const SigninFail = createAction('[Authentication] Signin Fail', props<{ message: string }>());
export const SigninSuccess = createAction('[Authentication] Signin Success');

export const SubmitOTPBegin = createAction('[Authentication] Submit OTP Begin', props<{ otp: string }>());
export const SubmitOTPFail = createAction('[Authentication] Submit OTP Fail', props<{ message: string, back?: boolean }>());
export const SubmitOTPSuccess = createAction('[Authentication] Submit OTP Success');
export const OTPTimeout = createAction('[Authentication] OTP Timeout');

export const SigninComplete = createAction('[Authentication] Signin Complete');

export const SignupRequestBegin = createAction('[Authentication] Signup Request Begin', props<{ payload: SignupPayloadModel }>());
export const SignupRequestFail = createAction('[Authentication] Signup Request Fail', props<{ message: string }>());
export const SignupRequestSuccess = createAction('[Authentication] Signup Request Success');

export const SignupConfirmCodeForm = createAction('[Authentication] Signup Confirm Code Form');

export const SignupComplete = createAction('[Authentication] Signup Complete');

export const SignoutRequestBegin = createAction('[Authentication] Signout Request Begin');
export const SignoutRequestFail = createAction('[Authentication] Signout Request Fail');
export const SignoutRequestSuccess = createAction('[Authentication] Signout Request Success');

export const CreateProfileRequestBegin = createAction('[Authentication] Create Profile Request Begin', props<{ body: ProfileModel }>());
export const CreateProfileRequestFail = createAction('[Authentication] Create Profile Request Fail', props<{ message: string }>());
export const CreateProfileRequestSuccess = createAction('[Authentication] Create Profile Request Success');


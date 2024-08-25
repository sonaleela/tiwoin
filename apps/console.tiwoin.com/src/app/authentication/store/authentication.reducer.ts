import { createReducer, on } from '@ngrx/store';
import { SignInOutput } from "aws-amplify/auth";

import * as fromActions from './authentication.actions';

export const authenticationFeatureKey = 'authentication';
export interface State {
    phoneNumber: string;
    // Signin
    isSigninPending: boolean;
    signinError: string;
    signinResponse: SignInOutput | null;
    // OTP
    isOTPPending: boolean;
    OTPError: string,

    isSignupPending: boolean;
    signupError: string;
}

const initialState: State = {
    phoneNumber: '',
    // Signin
    isSigninPending: false,
    signinError: '',
    signinResponse: null,
    // OTP
    isOTPPending: false,
    OTPError: '',

    isSignupPending: false,
    signupError: '',
};

export const reducer = createReducer(
    initialState,
    on(fromActions.ResetAuthInfo, _ => ({ ...initialState })),
    // signin
    on(fromActions.SigninBegin, (state, props) => ({ ...state, isSigninPending: true, signinError: '', OTPError: '', phoneNumber: props?.username })),
    on(fromActions.SigninFail, (state, props) => ({ ...state, isSigninPending: false, signinError: props.message, })),
    on(fromActions.SigninSuccess, (state, props) => ({ ...state, isSigninPending: false, signinError: '', signinResponse: props.response })),
    // OTP
    on(fromActions.SubmitOTPBegin, (state) => ({ ...state, isOTPPending: true, OTPError: '', })),
    on(fromActions.SubmitOTPFail, (state, props) => ({
        ...state,
        isOTPPending: false,
        OTPError: props.message,
        ...(props.back && { isOTPForm: false }),
    })),
    on(fromActions.SubmitOTPSuccess, (state) => ({ ...state, OTPError: '', isOTPForm: true, })),

    on(fromActions.SignupRequestBegin, (state) => ({ ...state, isSignupPending: true, signupError: '', })),
    on(fromActions.SignupRequestFail, (state, props) => ({ ...state, isSignupPending: false, signupError: props.message, })),
    on(fromActions.SignupRequestSuccess, (state) => ({ ...state, isSignupPending: false, signupError: '', isOTPForm: true, })),
    on(fromActions.SignupConfirmCodeForm, (state) => ({ ...state, isSignupCodeForm: true })),

    on(fromActions.SignoutRequestSuccess, (state) => ({ ...initialState, })),
);

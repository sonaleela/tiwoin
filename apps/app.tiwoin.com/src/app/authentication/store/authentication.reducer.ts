import { createReducer, on } from "@ngrx/store";
import { SignInOutput } from "aws-amplify/auth";

import * as fromActions from "./authentication.actions";
import * as fromRootStroe from "@store";

export const authenticationFeatureKey = 'authentication';

export interface State {
    phoneNumber: string;
    isSigninPending: boolean;
    signinError: string;
    signinResponse: SignInOutput | null;

    isOTPPending: boolean;
    OTPError: string;

    isSignupPending: boolean;
    signupError: string;
}

const initialState: State = {
    phoneNumber: '',
    isSigninPending: false,
    signinError: '',
    signinResponse: null,

    isOTPPending: false,
    OTPError: '',

    isSignupPending: false,
    signupError: '',
};

export const reducer = createReducer(
    initialState,
    on(fromActions.ResetAuthInfo, _ => ({ ...initialState })),
    on(fromActions.SigninBegin, (state, props) => ({ ...state, isSigninPending: true, signinError: '', OTPError: '', phoneNumber: props?.username })),
    on(fromActions.SigninFail, (state, props) => ({ ...state, isSigninPending: false, signinError: props.message })),
    on(fromActions.SigninSuccess, (state, props) => ({ ...state, isSigninPending: false, signinError: '', signinResponse: props.response })),

    on(fromActions.SubmitOTPBegin, state => ({ ...state, isOTPPending: true, OTPError: '' })),
    on(fromActions.SubmitOTPFail, (state, props) => ({
        ...state,
        isOTPPending: false,
        OTPError: props.message,
        ...(props.back && { isOTPForm: false }),
    })),
    on(fromActions.SubmitOTPSuccess, state => ({ ...state, OTPError: '' })),
    // Root config action to set loading flag for OTP form.
    on(fromRootStroe.PostAuthenticationInitSuccess, state => ({ ...state, isOTPPending: false })),

    on(fromActions.SignupRequestBegin, (state) => ({ ...state, isSignupPending: true, signupError: '', })),
    on(fromActions.SignupRequestFail, (state, props) => ({ ...state, isSignupPending: false, signupError: props.message, })),
    on(fromActions.SignupRequestSuccess, (state, props) => ({ ...state, isSignupPending: false, signupError: '', isOTPForm: true, })),
    on(fromActions.SignupConfirmCodeForm, (state, props) => ({ ...state, isSignupCodeForm: true })),
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, authenticationFeatureKey } from './authentication.reducer';

const selectAuthenticatoinState = createFeatureSelector<State>(authenticationFeatureKey);

export const selectIsSigninPending = createSelector(selectAuthenticatoinState, (state) => state.isSigninPending);
export const selectSigninError = createSelector(selectAuthenticatoinState, (state) => state.signinError);
export const selectIsOTPPending = createSelector(selectAuthenticatoinState, state => state.isOTPPending);
export const selectOTPError = createSelector(selectAuthenticatoinState, state => state.OTPError);
export const selectIsOTPForm = createSelector(selectAuthenticatoinState, state => state.isOTPForm);
export const selectPhoneNumber = createSelector(selectAuthenticatoinState, state => state.phoneNumber);

export const selectIsSignupPending = createSelector(selectAuthenticatoinState, (state) => state.isSignupPending);
export const selectSignupError = createSelector(selectAuthenticatoinState, (state) => state.signupError);

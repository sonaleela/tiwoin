import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRootStore from '@store';
import * as fromActions from './authentication.actions';
import { AuthenticationService, UserService } from '@services';

@Injectable()
export class AuthenticationEffects {
    private actions$: Actions = inject(Actions);
    private authenticationService: AuthenticationService = inject(AuthenticationService);
    private userService: UserService = inject(UserService);
    private router: Router = inject(Router);
    private store: Store = inject(Store);

    phoneNumber: string = '';

    /**
     * Signin request
     */
    signinBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SigninBegin),
        exhaustMap((payload) => this.authenticationService.signin(payload)),
        map(response => fromActions.SigninSuccess({ response })),
        catchError((error, caught) => {
            console.log(error);
            if (error.code === 'UserLambdaValidationException') {
                this.store.dispatch(fromActions.SigninFail({ message: 'This phone number does not exists as a username. Please check if number is correct' }));
            } else {
                this.store.dispatch(fromActions.SigninFail(error));
            }

            return caught;
        }),
    ));

    /**
     * Submit OTP
     */
    submitOTPBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SubmitOTPBegin),
        exhaustMap(payload => this.authenticationService.submitOTP(payload.otp)),
        map((response) => {
            if (!response.isSignedIn) {
                return fromActions.SubmitOTPFail({ message: 'OTP is wrong, try again!' });
            }
            return fromActions.SubmitOTPSuccess();
        }),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.SubmitOTPFail({ message: error?.message, back: true, }));
            return caught;
        })
    ));

    /**
     * Signin request success
     */
    submitOTPSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SubmitOTPSuccess),
        map((_) => fromActions.SigninComplete()),
    ));

    /**
     * Signup request begin
     */
    signupRequestBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SignupRequestBegin),
        exhaustMap((payload) => {
            this.phoneNumber = payload?.payload?.phone_number || '';
            return this.authenticationService.signup(payload.payload)
        }),
        map(_ => fromActions.SignupRequestSuccess()),
        catchError((error, caught) => {
            let message = error.message;
            if (error?.code === 'UserLambdaValidationException') {
                message = 'User already exist!'
            }
            this.store.dispatch(fromActions.SignupRequestFail({ message }));
            return caught;
        }),
    ));

    /**
     * Signup request success
     * If code is deliverd then > open signup confirmation form 
     */
    signupRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SignupRequestSuccess),
        map((_) => fromActions.SigninBegin({ username: this.phoneNumber })),
    ));

    /**
     * Sign out
     */
    signoutRequestBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SignoutRequestBegin),
        exhaustMap((_) => this.authenticationService.signout()),
        map((res) => {
            return fromActions.SignoutRequestSuccess();
        }),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.SignoutRequestFail());
            return caught;
        }),
    ));

    /**
     * Redirect to Signin page
     * If signout is success, or forgot password reset if successful
     */
    redirectToSignin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SignoutRequestSuccess),
        tap((_) => this.router.navigate(['/signin'])),
        tap(_ => location.reload()),
    ), { dispatch: false });

    /**
     * Signin/Signup completed
     */
    signinComplete$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.SigninComplete, fromActions.SignupComplete),
        exhaustMap(_ => this.authenticationService.getUserAttibutes()),
        map(body => fromActions.CreateProfileRequestBegin({ body })),
        catchError((error, caught) => {
            return caught;
        })
    ));

    /**
     * Create profile after signin completed
     */
    createProfileRequestBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.CreateProfileRequestBegin),
        exhaustMap(payload => {
            if (!payload.body.id) throw new Error("User id is missing for cognito user");

            return this.userService.update(payload.body.id, payload.body);
        }),
        map(_ => fromActions.CreateProfileRequestSuccess()),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.CreateProfileRequestFail({ message: error?.message }))
            return caught;
        })
    ));

    /**
     * Create profile successful now trigger `post auth init` to app-config
     */
    createProfileRequestSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.CreateProfileRequestSuccess),
        map((_) => fromRootStore.PostAuthenticationInitBegin()),
    ))
}

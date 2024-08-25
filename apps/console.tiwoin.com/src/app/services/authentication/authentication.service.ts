import { Injectable } from '@angular/core';
import {
    signIn, signUp, SignUpInput, fetchAuthSession, getCurrentUser, AuthUser, fetchUserAttributes,
    signOut, confirmSignUp, confirmSignIn, SignInOutput
} from '@aws-amplify/auth';
import { ProfileModel, SignupPayloadModel } from '@models';
import { from, Observable } from 'rxjs';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    getUser(): Observable<AuthUser> {
        return from(getCurrentUser());
    }

    getUserAttibutes(): Observable<ProfileModel> {
        return from(fetchUserAttributes()).pipe(map(attributes => {
            return {
                id: attributes.sub!,
                firstName: attributes.given_name!,
                lastName: attributes.family_name!,
                phoneNumber: attributes.phone_number!,
            };
        }));
    }

    signin(payload: { username: string; }): Observable<SignInOutput> {
        return from(signIn({ username: payload.username, options: { authFlowType: 'CUSTOM_WITHOUT_SRP' } }));
    }

    submitOTP(otp: string = ''): Observable<SignInOutput> {
        return from(confirmSignIn({ challengeResponse: otp }));
    }

    signup(payload: SignupPayloadModel) {
        if (!payload.phone_number) throw new Error("Phone number missing");

        const signUpInput: SignUpInput = {
            username: uuid(),
            password: payload.password || '',
            options: {
                userAttributes: {
                    phone_number: payload.phone_number || '',
                    given_name: payload.fname,
                    family_name: payload.lname,
                }
            },
        };
        return from(signUp(signUpInput));
    }

    resendSignupCode() { }

    signupCodeSubmit(username: string, confirmationCode: string) {
        return from(confirmSignUp({ username, confirmationCode }));
    }

    signout() {
        return from(signOut());
    }

    getAccessToken() {
        return from(fetchAuthSession()).pipe(map((session) => session.tokens?.accessToken));
    }
}

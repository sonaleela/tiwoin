import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import * as fromStore from "../../store";

@Component({
    selector: 'tiwoin-signin-controller',
    templateUrl: './signin-controller.component.html',
    styles: [`:host {@apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninControllerComponent {
    private store: Store = inject(Store);

    isOTPForm$ = this.store.select(fromStore.selectIsOTPForm);
    isSigninPending$ = this.store.select(fromStore.selectIsSigninPending);
    signinError$ = this.store.select(fromStore.selectSigninError);
    isOTPPending$ = this.store.select(fromStore.selectIsOTPPending);
    otpError$ = this.store.select(fromStore.selectOTPError);
    phoneNumber$ = this.store.select(fromStore.selectPhoneNumber)

    countdown$ = timer(0, 1000).pipe(
        take(180),
        map(secondsElapsed => 180 - secondsElapsed),
        tap(secondsElapsed => {
            if (secondsElapsed === 0) this.store.dispatch(fromStore.OTPTimeout());
        })
    );
    constructor() { }

    submit(payload: any) {
        this.store.dispatch(fromStore.SigninBegin({ username: payload?.username }));
    }

    submitOTP(payload: any) {
        this.store.dispatch(fromStore.SubmitOTPBegin({ otp: payload?.otp }));
    }

    editPhoneNumber(event: boolean) {
        if (!event) return;
        this.store.dispatch(fromStore.ResetAuthInfo());
    }
}

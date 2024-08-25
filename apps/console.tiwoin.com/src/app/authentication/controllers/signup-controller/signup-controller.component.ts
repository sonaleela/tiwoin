import { Component, inject } from '@angular/core';
import { SignupPayloadModel } from '@models';
import { Store } from '@ngrx/store';
import { SwiperOptions } from 'swiper/types';
import { timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import * as fromStore from '../../store';

@Component({
    selector: 'sonaleela-signup-controller',
    templateUrl: './signup-controller.component.html',
    styles: [`:host {@apply h-full block;}`],
})
export class SignupControllerComponent {
    private store: Store = inject(Store);

    isSignupPending$ = this.store.select(fromStore.selectIsSignupPending);
    signupError$ = this.store.select(fromStore.selectSignupError);

    isOTPForm$ = this.store.select(fromStore.selectIsOTPForm);

    isOTPPending$ = this.store.select(fromStore.selectIsOTPPending);
    OTPError$ = this.store.select(fromStore.selectOTPError);
    phoneNumber$ = this.store.select(fromStore.selectPhoneNumber);

    countdown$ = timer(0, 1000).pipe(
        take(180),
        map(secondsElapsed => 180 - secondsElapsed),
        tap(secondsElapsed => {
            if (secondsElapsed === 0) this.store.dispatch(fromStore.OTPTimeout());
        })
    );

    swiperOptions: SwiperOptions = {
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: (_: any, className: string) => {
                return '<span class="' + className + '"></span>';
            },
        },
    };

    submitSignupForm(payload: SignupPayloadModel) {
        this.store.dispatch(fromStore.SignupRequestBegin({ payload }));
    }

    submitOTPform(event: { otp: string }) {
        this.store.dispatch(fromStore.SubmitOTPBegin(event));
    }

    editPhoneNumber(event: boolean) {
        if (!event) return;
        this.store.dispatch(fromStore.ResetAuthInfo());
    }
}

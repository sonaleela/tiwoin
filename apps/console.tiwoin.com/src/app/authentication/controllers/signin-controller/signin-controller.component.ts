import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SwiperOptions } from 'swiper/types';
import { timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import * as fromStore from '../../store';

@Component({
    selector: 'sonaleela-signin-controller',
    templateUrl: './signin-controller.component.html',
    styles: [`:host {@apply h-full block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninControllerComponent {
    private store: Store = inject(Store);

    isSigninPending$ = this.store.select(fromStore.selectIsSigninPending);
    signinError$ = this.store.select(fromStore.selectSigninError);
    isOTPPending$ = this.store.select(fromStore.selectIsOTPPending);
    otpError$ = this.store.select(fromStore.selectOTPError);
    isOTPForm$ = this.store.select(fromStore.selectIsOTPForm);
    phoneNumber$ = this.store.select(fromStore.selectPhoneNumber)

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
        zoom: {

        }
    };

    submitSigninForm(event: { username: string; }) {
        this.store.dispatch(fromStore.SigninBegin(event));
    }

    submitOTPForm(event: { otp: string; }) {
        this.store.dispatch(fromStore.SubmitOTPBegin(event));
    }

    editPhoneNumber(event: boolean) {
        if (!event) return;
        this.store.dispatch(fromStore.ResetAuthInfo());
    }
}

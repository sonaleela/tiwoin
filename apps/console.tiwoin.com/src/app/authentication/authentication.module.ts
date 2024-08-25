import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';

import { SluiButtonModule, SonaleelaFormFieldModule, SluiIconModule } from '@sonaleela/ui';
import { authenticationGuard, unauthenticationGuard } from '@core';
import { AuthenticationEffects, authenticationFeatureKey, reducer } from './store';
import { SigninPageComponent, SignupPageComponent, SignoutPageComponent } from './pages';
import {
    SigninControllerComponent,
    SignupControllerComponent,
    SignoutControllerComponent,
} from './controllers';
import {
    SigninFormComponent,
    SignupFormComponent,
    OtpFormComponent,
} from './components';
import { LayoutType } from '../models';
import { SwiperCustomModule } from '@shared';

@NgModule({
    imports: [
        CommonModule,
        SonaleelaFormFieldModule,
        SluiIconModule,
        SluiButtonModule,
        ReactiveFormsModule,
        SwiperCustomModule,
        CdkMenuModule,
        StoreModule.forFeature(authenticationFeatureKey, reducer),
        EffectsModule.forFeature([AuthenticationEffects]),
        RouterModule.forChild([
            {
                path: 'signin',
                component: SigninPageComponent,
                canActivate: [unauthenticationGuard],
                data: { layout: LayoutType.EMPTY },
            },
            {
                path: 'signup',
                component: SignupPageComponent,
                canActivate: [unauthenticationGuard],
                data: { layout: LayoutType.EMPTY },
            },
            {
                path: 'signout',
                component: SignoutPageComponent,
                canActivate: [authenticationGuard],
                data: { layout: LayoutType.EMPTY },
            },
        ]),
    ],
    declarations: [
        SigninPageComponent,
        SigninControllerComponent,
        SignupControllerComponent,
        SignupPageComponent,
        SigninFormComponent,
        SignupFormComponent,
        SignoutPageComponent,
        SignoutControllerComponent,
        OtpFormComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule { }

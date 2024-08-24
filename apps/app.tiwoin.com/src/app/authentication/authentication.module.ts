import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SluiButtonModule, SonaleelaFormFieldModule, SluiIconModule } from '@sonaleela/ui';

import { LayoutType } from '@models';
import { authenticationGuard, unauthenticationGuard } from '@core';
import { SigninPageComponent, SignoutPageComponent, SignupPageComponent } from './pages';
import { SigninControllerComponent, SignoutControllerComponent, SignupControllerComponent } from './controllers';
import { SigninFormComponent, OtpFormComponent, SignupFormComponent } from './components';
import { AuthenticationEffects, authenticationFeatureKey, reducer } from './store';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SluiButtonModule,
        SonaleelaFormFieldModule,
        SluiIconModule,
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
        ])
    ],
    declarations: [
        SigninPageComponent,
        SigninControllerComponent,
        SigninFormComponent,
        OtpFormComponent,
        SignoutPageComponent,
        SignoutControllerComponent,
        SignupPageComponent,
        SignupControllerComponent,
        SignupFormComponent
    ],
})
export class AuthenticationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SluiIconModule, SluiButtonModule } from '@sonaleela/ui';

import { LayoutType } from '@models';
import { authenticationGuard } from '@core';
import { profileFeatureKey, reducer, ProfileEffects } from './store';
import { ProfilePageComponent } from './pages';
import { MfaCardComponent, ProfileCardComponent, GeneralProfileCardComponent, DateTimeSettingsComponent } from './components';
import { ProfileControllerComponent } from './controller';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SluiButtonModule,
        SluiIconModule,
        StoreModule.forFeature(profileFeatureKey, reducer),
        EffectsModule.forFeature([ProfileEffects]),
        RouterModule.forChild([
            {
                path: 'profile',
                component: ProfilePageComponent,
                canActivate: [authenticationGuard],
                data: { layout: LayoutType.SIDENAV },
            },
        ]),
    ],
    declarations: [ProfilePageComponent, MfaCardComponent, ProfileCardComponent, ProfileControllerComponent, GeneralProfileCardComponent, DateTimeSettingsComponent],
})
export class ProfileModule { }

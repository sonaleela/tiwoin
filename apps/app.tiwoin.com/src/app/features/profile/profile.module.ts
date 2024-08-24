import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import { authenticationGuard } from '@core';
import { LayoutType } from '@models';
import { ProfilePageComponent, DocumentPageComponent } from './pages';
import { ProfileControllerComponent, DocumentControllerComponent, UploadControllerComponent } from './controllers';
import {
    ProfileComponent,
    DocumentListComponent,
    UploadFileComponent,
    ProfileFormComponent,
    ProfilePhotoFormComponent,
    ContactFormComponent,
} from './components';
import { reducer, profileItemFeatureKey, ProfileEffects } from "./store";
import { LoadingModule } from '@shared';

@NgModule({
    imports: [
        CommonModule,
        LoadingModule,
        SluiIconModule,
        SluiButtonModule,
        ReactiveFormsModule,
        StoreModule.forFeature(profileItemFeatureKey, reducer),
        EffectsModule.forFeature([ProfileEffects]),
        RouterModule.forChild([{
            path: 'profile',
            component: ProfilePageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY }
        }, {
            path: 'profile/document',
            component: DocumentPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY }
        }])
    ],
    declarations: [
        ProfilePageComponent,
        DocumentPageComponent,
        ProfileControllerComponent,
        DocumentControllerComponent,
        ProfileComponent,
        DocumentListComponent,
        UploadControllerComponent,
        UploadFileComponent,
        ProfileFormComponent,
        ContactFormComponent,
        ProfilePhotoFormComponent,
    ],
})
export class ProfileModule { }

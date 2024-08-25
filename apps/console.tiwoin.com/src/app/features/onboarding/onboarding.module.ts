import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { SluiButtonModule, SonaleelaCardModule, SluiIconModule, SonaleelaFormFieldModule } from '@sonaleela/ui';

import { authenticationGuard } from '@core';
import { GeoFenceModule, LoadingModule } from '@shared';
import { LayoutType } from '@models';
import { OnboardOrganizationPageComponent, OnboardSitePageComponent, OrganizationListPageComponent } from './pages';
import { CreateOrganizationControllerComponent, CreateSiteControllerComponent, OrganizationListControllerComponent } from './controllers';
import { OrganizationFormComponent, SiteFormComponent, GeoFenceComponent, GeofenceDialogComponent, OrganizationListComponent } from './components';
import { OnboardingEffects, onboardingFeatureKey, reducer } from './store';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SluiButtonModule,
        SluiIconModule,
        SonaleelaCardModule,
        SonaleelaFormFieldModule,
        GeoFenceModule,
        LoadingModule,
        StoreModule.forFeature(onboardingFeatureKey, reducer),
        EffectsModule.forFeature([OnboardingEffects]),
        RouterModule.forChild([
            {
                path: 'onboard-organization',
                component: OnboardOrganizationPageComponent,
                canActivate: [authenticationGuard],
                data: { layout: LayoutType.EMPTY },
            },
            {
                path: 'onboard-site',
                component: OnboardSitePageComponent,
                canActivate: [authenticationGuard],
                data: { layout: LayoutType.EMPTY },
            },
            {
                path: 'organization-list',
                component: OrganizationListPageComponent,
                canActivate: [authenticationGuard],
                data: { layout: LayoutType.EMPTY },
            },
        ]),
    ],
    declarations: [
        OnboardOrganizationPageComponent,
        OnboardSitePageComponent,
        CreateOrganizationControllerComponent,
        OrganizationFormComponent,
        CreateSiteControllerComponent,
        SiteFormComponent,
        GeoFenceComponent,
        GeofenceDialogComponent,
        OrganizationListPageComponent,
        OrganizationListControllerComponent,
        OrganizationListComponent,
    ],
})
export class OnboardingModule { }

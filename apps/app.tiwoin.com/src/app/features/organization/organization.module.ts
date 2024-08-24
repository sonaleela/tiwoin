import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';

import { EmptyOrganizationPageComponent, OrganizationListPageComponent } from './pages';
import { EmptyOrganizationControllerComponent, OrganizationListControllerComponent } from './controllers';
import { EmptyOrganizationComponent, OrganizationListComponent } from './components';
import { LoadingModule } from '@shared';
import { authenticationGuard } from '@core';
import { LayoutType } from '@models';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrganizationEffects, organizationFeatureKey, reducer } from './store';

@NgModule({
    imports: [
        CommonModule,
        SluiIconModule,
        SluiButtonModule,
        LoadingModule,
        StoreModule.forFeature(organizationFeatureKey, reducer),
        EffectsModule.forFeature([OrganizationEffects]),
        RouterModule.forChild([{
            path: 'organization/empty',
            component: EmptyOrganizationPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY },
        }, {
            path: 'organization/list',
            component: OrganizationListPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY },
        }]),
    ],
    declarations: [
        EmptyOrganizationPageComponent,
        EmptyOrganizationControllerComponent,
        EmptyOrganizationComponent,
        OrganizationListComponent,
        OrganizationListControllerComponent,
        OrganizationListPageComponent
    ],
})
export class OrganizationModule { }

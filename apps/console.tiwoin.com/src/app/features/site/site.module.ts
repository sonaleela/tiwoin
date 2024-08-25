import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from "@angular/cdk/table";
import { DialogModule } from "@angular/cdk/dialog";
import { SluiButtonModule, SluiIconModule, SonaleelaFormFieldModule } from '@sonaleela/ui';

import { authenticationGuard } from '@core';
import { GeoFenceModule, GeofenceEmptyDialogComponent, LoadingModule } from '@shared';
import { LayoutType } from '@models';
import { reducer, siteFeatureKey, SiteEffects } from './store';
import { ListSitePageComponent, AddSitePageComponent, EditSitePageComponent } from './pages';
import { ListSiteControllerComponent, AddSiteControllerComponent, EditSiteControllerComponent } from './controllers';
import { SiteListCardComponent, AddSiteFormComponent, SiteListHeaderComponent, GeoFenceComponent, DialogDeleteComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SonaleelaFormFieldModule,
        SluiButtonModule,
        SluiIconModule,
        CdkTableModule,
        DialogModule,
        GeoFenceModule,
        GeofenceEmptyDialogComponent,
        LoadingModule,
        StoreModule.forFeature(siteFeatureKey, reducer),
        EffectsModule.forFeature([SiteEffects]),
        RouterModule.forChild([
            { path: 'site', component: ListSitePageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
            { path: 'site/add', component: AddSitePageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
            { path: 'site/:uid', component: EditSitePageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
        ]),
    ],
    declarations: [
        ListSitePageComponent,
        ListSiteControllerComponent,
        SiteListCardComponent,
        AddSitePageComponent,
        AddSiteControllerComponent,
        AddSiteFormComponent,
        GeoFenceComponent,
        SiteListHeaderComponent,
        EditSitePageComponent,
        EditSiteControllerComponent,
        DialogDeleteComponent,
    ],
})
export class SiteModule { }

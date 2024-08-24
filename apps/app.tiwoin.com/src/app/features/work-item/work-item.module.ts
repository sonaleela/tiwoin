import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SluiIconModule, SluiButtonModule } from '@sonaleela/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authenticationGuard } from "@core";
import { LoadingModule, DateFilterBarComponent } from "@shared";
import { LayoutType } from '@models';
import { WorkItemListPageComponent, WorkItemSubmissionListPageComponent, WorkItemPageComponent } from './pages';
import { WorkItemListControllerComponent, WorkItemSubmissionListControllerComponent, WorkItemControllerComponent } from './controllers';
import { WorkItemListComponent, WorkItemSubmissionListComponent, WorkItemFormComponent } from './components';
import { workItemFeatureKey, reducer, WorkItemEffects } from "./store";

@NgModule({
    imports: [
        CommonModule,
        SluiIconModule,
        SluiButtonModule,
        ReactiveFormsModule,
        LoadingModule,
        DateFilterBarComponent,
        StoreModule.forFeature(workItemFeatureKey, reducer),
        EffectsModule.forFeature([WorkItemEffects]),
        RouterModule.forChild([{
            path: 'work-item',
            component: WorkItemSubmissionListPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY }
        }, {
            path: 'work-item/list',
            component: WorkItemListPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.BOTTOMNAV }
        }, {
            path: 'work-item/:uid',
            component: WorkItemPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY }
        }]),
    ],
    declarations: [
        WorkItemListPageComponent,
        WorkItemListControllerComponent,
        WorkItemListComponent,
        WorkItemSubmissionListPageComponent,
        WorkItemSubmissionListControllerComponent,
        WorkItemSubmissionListComponent,
        WorkItemPageComponent,
        WorkItemControllerComponent,
        WorkItemFormComponent
    ],
})
export class WorkItemModule { }

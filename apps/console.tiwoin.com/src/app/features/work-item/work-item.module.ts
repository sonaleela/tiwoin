import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CdkTableModule } from "@angular/cdk/table";
import { SluiButtonModule, SluiIconModule } from "@sonaleela/ui";

import { LayoutType } from '@models';
import { LoadingModule, SelectEmployeeComponent } from '@shared';
import { authenticationGuard } from '@core';
import { workItemFeatureKey, reducer, WorkItemEffects } from './store';
import { WorkItemListPageComponent, AddWorkItemPageComponent, EditWorkItemPageComponent, SubmitWorkItemPageComponent } from './pages';
import { WorkItemListControllerComponent, AddWorkItemControllerComponent, EditWorkItemControllerComponent, SubmitWorkItemControllerComponent } from './controllers';
import { WorkItemCardListComponent, WorkItemListHeaderComponent, AddWorkItemFormComponent, EditWorkItemFormComponent, SubmitWorkItemFormComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CdkTableModule,
        SluiButtonModule,
        SluiIconModule,
        LoadingModule,
        SelectEmployeeComponent,
        StoreModule.forFeature(workItemFeatureKey, reducer),
        EffectsModule.forFeature([WorkItemEffects]),
        RouterModule.forChild([{
            path: 'work-item',
            component: WorkItemListPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.SIDENAV },
        }, {
            path: 'work-item/add',
            component: AddWorkItemPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.SIDENAV },
        }, {
            path: 'work-item/submit/:uid',
            component: SubmitWorkItemPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.SIDENAV },
        }, {
            path: 'work-item/:uid',
            component: EditWorkItemPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.SIDENAV },
        },]),
    ],
    declarations: [
        WorkItemListPageComponent,
        WorkItemListControllerComponent,
        WorkItemCardListComponent,
        AddWorkItemPageComponent,
        AddWorkItemControllerComponent,
        AddWorkItemFormComponent,
        WorkItemListHeaderComponent,
        EditWorkItemPageComponent,
        EditWorkItemControllerComponent,
        EditWorkItemFormComponent,
        SubmitWorkItemPageComponent,
        SubmitWorkItemControllerComponent,
        SubmitWorkItemFormComponent,
    ],
})
export class WorkItemModule { }

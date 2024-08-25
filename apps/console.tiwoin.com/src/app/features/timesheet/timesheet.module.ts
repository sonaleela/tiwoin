import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from "@angular/cdk/table";
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LayoutType } from '@models';
import { LoadingModule } from "@shared";
import { authenticationGuard } from '@core';
import { TimesheetListPageComponent, AddTimesheetPageComponent, EditTimesheetPageComponent } from './pages';
import { TimesheetListControllerComponent, AddTimesheetControllerComponent, EditTimesheetControllerComponent } from './controllers';
import { TimesheetListComponent, TimesheetListHeaderComponent, AddTimesheetFormComponent, EditTimesheetFormComponent } from './components';
import { timesheetFeatureKey, reducer, TimesheetEffects } from "./store";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CdkTableModule,
        SluiIconModule,
        SluiButtonModule,
        LoadingModule,
        StoreModule.forFeature(timesheetFeatureKey, reducer),
        EffectsModule.forFeature([TimesheetEffects]),
        RouterModule.forChild([
            {
                path: 'timesheet',
                canActivate: [authenticationGuard],
                component: TimesheetListPageComponent,
                data: { layout: LayoutType.SIDENAV },
            },
            {
                path: 'timesheet/add',
                canActivate: [authenticationGuard],
                component: AddTimesheetPageComponent,
                data: { layout: LayoutType.SIDENAV },
            },
            {
                path: 'timesheet/:uid',
                canActivate: [authenticationGuard],
                component: EditTimesheetPageComponent,
                data: { layout: LayoutType.SIDENAV },
            },
        ])
    ],
    declarations: [
        TimesheetListPageComponent,
        TimesheetListControllerComponent,
        TimesheetListComponent,
        TimesheetListHeaderComponent,
        AddTimesheetFormComponent,
        AddTimesheetControllerComponent,
        AddTimesheetPageComponent,
        EditTimesheetPageComponent,
        EditTimesheetControllerComponent,
        EditTimesheetFormComponent
    ],
})
export class TimesheetModule { }

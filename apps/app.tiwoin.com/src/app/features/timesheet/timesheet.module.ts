import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CdkTableModule } from '@angular/cdk/table';

import { SluiIconModule, SluiButtonModule } from '@sonaleela/ui';
import { authenticationGuard } from '@core';
import { LoadingModule, TimesheetBarModule, SlideDropModule, MonthFilterBarComponent } from "@shared";
import { reducer, timesheetFeatureKey, TimesheetEffects, RouterEffects } from "./store";
import { LayoutType } from '@models';
import { TimesheetListPageComponent, TimesheetClockPageComponent } from './pages';
import { TimesheetListControllerComponent, TimesheetClockControllerComponent } from './controllers';
import { TimesheetListComponent, TimesheetClockComponent, TimesheetListHeaderComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        LoadingModule,
        TimesheetBarModule,
        SlideDropModule,
        SluiIconModule,
        SluiButtonModule,
        CdkTableModule,
        MonthFilterBarComponent,
        StoreModule.forFeature(timesheetFeatureKey, reducer),
        EffectsModule.forFeature([RouterEffects, TimesheetEffects]),
        RouterModule.forChild([{
            path: 'timesheet',
            component: TimesheetListPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY }
        }, {
            path: 'timesheet/clock',
            component: TimesheetClockPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.BOTTOMNAV }
        }])
    ],
    declarations: [
        TimesheetListPageComponent,
        TimesheetListControllerComponent,
        TimesheetListComponent,
        TimesheetClockPageComponent,
        TimesheetClockControllerComponent,
        TimesheetClockComponent,
        TimesheetListHeaderComponent
    ],
})
export class TimesheetModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LayoutType } from '@models';
import { LoadingModule, GeoLocationDirective, SelectEmployeeComponent } from '@shared';
import { DataEffects, reducer, dataFeatureKey } from "./store";
import {
    WorkItemDataPageComponent,
    TimesheetDataPageComponent,
    FormDataPageComponent,
    PayrollDataPageComponent,
    AddTimesheetDataPageComponent,
    EditTimesheetDataPageComponent,
    EditWorkItemDataPageComponent,
    ViewWorkItemDataPageComponent,
    EditFormDataPageComponent,
    ViewFormDataPageComponent,
} from './pages';
import {
    WorkItemDataControllerComponent,
    TimesheetDataControllerComponent,
    FormDataControllerComponent,
    PayrollDataControllerComponent,
    AddTimesheetDataControllerComponent,
    EditTimesheetDataControllerComponent,
    EditWorkItemDataControllerComponent,
    ViewWorkItemDataControllerComponent,
    ViewFormDataControllerComponent,
    EditFormDataControllerComponent,
} from './controllers';
import {
    WorkItemDataComponent,
    TimesheetDataComponent,
    FormDataComponent,
    PayrollDataComponent,
    FormDataHeaderComponent,
    PayrollDataHeaderComponent,
    TimesheetDataHeaderComponent,
    WorkItemDataHeaderComponent,
    TimesheetTimelineComponent,
    FormDataViewComponent,
    FilterComponent,
    TimesheetDateSelectorComponent,
    PayrollDateSelectorComponent,
    WorkItemViewComponent,
    AddTimesheetDataComponent,
    EditTimesheetDataComponent,
    EditWorkItemDataComponent,
    ViewWorkItemDataComponent,
    EditFormDataComponent,
    ViewFormDataComponent,
} from './components';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SluiButtonModule,
        SluiIconModule,
        CdkTableModule,
        MatSortModule,
        MatPaginatorModule,
        LoadingModule,
        GeoLocationDirective,
        SelectEmployeeComponent,
        StoreModule.forFeature(dataFeatureKey, reducer),
        EffectsModule.forFeature([DataEffects]),
        RouterModule.forChild([
            {
                path: 'data/timesheet', component: TimesheetDataPageComponent,
                data: { layout: LayoutType.SIDENAV },
                children: [
                    { path: 'add', component: AddTimesheetDataPageComponent, outlet: 'aside' },
                    { path: 'edit/:uid', component: EditTimesheetDataPageComponent, outlet: 'aside' },
                ],
            },
            {
                path: 'data/form',
                component: FormDataPageComponent,
                data: { layout: LayoutType.SIDENAV },
                children: [
                    { path: 'view/:uid', component: ViewFormDataPageComponent, outlet: 'aside' },
                    { path: 'edit/:uid', component: EditFormDataPageComponent, outlet: 'aside' },
                ],
            },
            {
                path: 'data/work-item',
                component: WorkItemDataPageComponent,
                data: { layout: LayoutType.SIDENAV },
                children: [
                    { path: 'view/:uid', component: ViewWorkItemDataPageComponent, outlet: 'aside' },
                    { path: 'edit/:uid', component: EditWorkItemDataPageComponent, outlet: 'aside' },
                ]
            },
            { path: 'data/payroll', component: PayrollDataPageComponent, data: { layout: LayoutType.SIDENAV }, },
        ]),
    ],
    declarations: [
        WorkItemDataPageComponent,
        FormDataPageComponent,
        PayrollDataPageComponent,
        WorkItemDataControllerComponent,
        FormDataControllerComponent,
        PayrollDataControllerComponent,
        WorkItemDataComponent,
        FormDataComponent,
        PayrollDataComponent,
        TimesheetDataComponent,
        TimesheetDataControllerComponent,
        TimesheetDataPageComponent,
        FormDataHeaderComponent,
        PayrollDataHeaderComponent,
        TimesheetDataHeaderComponent,
        WorkItemDataHeaderComponent,
        TimesheetTimelineComponent,
        FormDataViewComponent,
        FilterComponent,
        TimesheetDateSelectorComponent,
        TimesheetDateSelectorComponent,
        PayrollDateSelectorComponent,
        WorkItemViewComponent,
        AddTimesheetDataComponent,
        EditTimesheetDataComponent,
        AddTimesheetDataPageComponent,
        AddTimesheetDataControllerComponent,
        EditTimesheetDataPageComponent,
        EditTimesheetDataControllerComponent,
        EditWorkItemDataPageComponent,
        EditWorkItemDataControllerComponent,
        EditWorkItemDataComponent,
        ViewWorkItemDataPageComponent,
        ViewWorkItemDataControllerComponent,
        ViewWorkItemDataComponent,
        EditFormDataPageComponent,
        ViewFormDataPageComponent,
        ViewFormDataControllerComponent,
        EditFormDataControllerComponent,
        EditFormDataComponent,
        ViewFormDataComponent,
    ],
})
export class DataModule { }

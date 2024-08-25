import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from "@angular/cdk/table";

import { authenticationGuard } from '@core';
import { LoadingModule } from "@shared";
import { LayoutType } from '@models';
import { SluiButtonModule, SluiIconModule, SonaleelaFormFieldModule, SonaleelaCardModule } from '@sonaleela/ui';
import { PayrollEffects, payrollFeatureKey, reducer } from './store';
import {
    PayrollListPageComponent,
    AddPayrollPageComponent,
    EditPayrollPageComponent,
    PayrollComponentsListPageComponent,
} from './pages';
import {
    PayrollListControllerComponent,
    AddPayrollControllerComponent,
    AddPayrollComponentControllerComponent,
    PayrollComponentListControllerComponent,
    EditPayrollControllerComponent,
} from './controllers';
import {
    PayrollListCardComponent,
    PayrollComponentFormComponent,
    AddPayrollFormComponent,
    PayrollComponentListComponent,
    PayrollListHeaderComponent,
    EditPayrollFormComponent,
} from './components';
import { PayrollComponentsSidelistControllerComponent } from './controllers/payroll-components-sidelist-controller/payroll-components-sidelist-controller.component';
import { PayrollComponentListHeaderComponent } from './components/payroll-component-list-header/payroll-component-list-header.component';
import { PayrollComponentSidelistComponent } from './components/payroll-component-sidelist/payroll-component-sidelist.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SluiIconModule,
        SluiButtonModule,
        SonaleelaFormFieldModule,
        SonaleelaCardModule,
        CdkTableModule,
        LoadingModule,
        StoreModule.forFeature(payrollFeatureKey, reducer),
        EffectsModule.forFeature([PayrollEffects]),
        RouterModule.forChild([
            {
                path: 'payroll',
                component: PayrollListPageComponent,
                canActivate: [authenticationGuard],
                data: { layout: LayoutType.SIDENAV },
            },
            {
                path: 'payroll/components',
                component: PayrollComponentsListPageComponent,
                canActivate: [authenticationGuard],
                data: { layout: LayoutType.SIDENAV },
            },
            {
                path: 'payroll/add',
                component: AddPayrollPageComponent,
                canActivate: [authenticationGuard],
                data: { layout: LayoutType.SIDENAV },
            },
            {
                path: 'payroll/:uid',
                component: EditPayrollPageComponent,
                canActivate: [authenticationGuard],
                data: { layout: LayoutType.SIDENAV },
            },
        ]),
    ],
    declarations: [
        PayrollListPageComponent,
        PayrollListControllerComponent,
        PayrollListCardComponent,
        AddPayrollPageComponent,
        AddPayrollControllerComponent,
        PayrollComponentFormComponent,
        AddPayrollFormComponent,
        PayrollComponentListComponent,
        PayrollListHeaderComponent,
        AddPayrollComponentControllerComponent,
        PayrollComponentListControllerComponent,
        EditPayrollPageComponent,
        EditPayrollControllerComponent,
        EditPayrollFormComponent,
        PayrollComponentsListPageComponent,
        PayrollComponentsSidelistControllerComponent,
        PayrollComponentListHeaderComponent,
        PayrollComponentSidelistComponent,
    ],
})
export class PayrollModule { }

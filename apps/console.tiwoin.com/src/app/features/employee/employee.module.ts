import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CdkTableModule } from "@angular/cdk/table";
import { CdkMenuModule } from '@angular/cdk/menu';

import { LayoutType } from '@models';
import { LoadingModule } from "@shared";
import { authenticationGuard } from '@core';
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import { employeeFeatureKey, reducer, EmployeeEffects } from './store';
import {
    EmployeeListPageComponent,
    AddEmployeePageComponent,
    EmployeePersonalPageComponent,
    EmployeeCompanyPageComponent,
    EmployeeIncomePageComponent,
    EmployeeDocumentPageComponent,
    EmployeeTimeLeavePageComponent,
    EmployeePageComponent,
    EmployeeAdvancePaymentPageComponent,
} from './pages';
import {
    EmployeeListControllerComponent,
    AddEmployeeControllerComponent,
    PersonalProfileControllerComponent,
    CompanyProfileControllerComponent,
    IncomeControllerComponent,
    DocumentControllerComponent,
    TimeLeaveControllerComponent,
    EmployeeControllerComponent,
    AdvancePaymentControllerComponent,
} from './controllers';
import {
    EmployeeListComponent,
    AddEmployeeFormComponent,
    EmployeeListHeaderComponent,
    SideNavComponent,
    EmployeeHeaderComponent,
    PersonalProfileComponent,
    CompanyProfileComponent,
    DocumentSectionComponent,
    IncomeSectionComponent,
    TimeLeaveComponent,
    PayrollFormComponent,
    DocumentFormComponent,
    DocumentRequestFormComponent,
    AdvancePaymentSectionComponent,
    AddAdvancePaymentFormComponent,
} from './components';

@NgModule({
    imports: [
        CommonModule,
        SluiButtonModule,
        SluiIconModule,
        ReactiveFormsModule,
        CdkTableModule,
        CdkMenuModule,
        LoadingModule,
        StoreModule.forFeature(employeeFeatureKey, reducer),
        EffectsModule.forFeature([EmployeeEffects]),
        RouterModule.forChild([
            { path: 'employee', component: EmployeeListPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV }, },
            { path: 'employee/add', component: AddEmployeePageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV }, },
            {
                path: 'employee',
                component: EmployeePageComponent,
                children: [
                    { path: ':uid', component: EmployeePersonalPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV }, },
                    { path: ':uid/personal', component: EmployeePersonalPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV }, },
                    { path: ':uid/company', component: EmployeeCompanyPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV }, },
                    { path: ':uid/income', component: EmployeeIncomePageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV }, },
                    { path: ':uid/documents', component: EmployeeDocumentPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV }, },
                    { path: ':uid/time-and-leave', component: EmployeeTimeLeavePageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV }, },
                    { path: ':uid/advance-payment', component: EmployeeAdvancePaymentPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV }, },
                ]
            }
        ]),
    ],
    declarations: [
        EmployeeListPageComponent,
        EmployeeListControllerComponent,
        AddEmployeePageComponent,
        AddEmployeeControllerComponent,
        AddEmployeeFormComponent,
        EmployeePersonalPageComponent,
        EmployeeCompanyPageComponent,
        EmployeeIncomePageComponent,
        EmployeeDocumentPageComponent,
        EmployeeTimeLeavePageComponent,
        EmployeeListHeaderComponent,
        EmployeeListComponent,
        PersonalProfileControllerComponent,
        SideNavComponent,
        CompanyProfileControllerComponent,
        IncomeControllerComponent,
        DocumentControllerComponent,
        TimeLeaveControllerComponent,
        EmployeeHeaderComponent,
        PersonalProfileComponent,
        CompanyProfileComponent,
        DocumentSectionComponent,
        IncomeSectionComponent,
        TimeLeaveComponent,
        PayrollFormComponent,
        DocumentFormComponent,
        DocumentRequestFormComponent,
        EmployeePageComponent,
        EmployeeControllerComponent,
        EmployeeAdvancePaymentPageComponent,
        AdvancePaymentControllerComponent,
        AdvancePaymentSectionComponent,
        AddAdvancePaymentFormComponent,
    ],
})
export class EmployeeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from "@angular/cdk/table";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { SluiButtonModule, SluiIconModule } from "@sonaleela/ui";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { authenticationGuard } from '@core';
import { LoadingModule, DynamicFormModule } from "@shared";
import { LayoutType } from '@models';
import {
    FormListPageComponent,
    FormBuilderPageComponent,
    FormPreviewPageComponent,
    EditFormPageComponent
} from './pages';
import {
    FormListControllerComponent,
    FormBuilderControllerComponent,
    FormPreviewControllerComponent,
    EditFormControllerComponent,
    FormFieldBuilderControllerComponent
} from './controllers';
import {
    FormListTableComponent,
    AddFormComponent,
    FormListHeaderComponent,
    FileFormControlComponent,
    DateFormControlComponent,
    TimeFormControlComponent,
    EmailFormControlComponent,
    DatetimeFormControlComponent,
    PhoneFormControlComponent,
    NumberFormControlComponent,
    RadioFormControlComponent,
    CheckboxFormControlComponent,
    ToggleFormControlComponent,
    DropdownFormControlComponent,
    ControlSelectionSectionComponent,
    TextFormControlComponent,
    TextareaFormControlComponent,
    FormControlPreivewComponent,
    EditFormComponent
} from './components';
import { FormControlDirective } from './directives';
import { formFeatureKey, reducer, FormEffects } from './store';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SluiButtonModule,
        SluiIconModule,
        CdkTableModule,
        CdkAccordionModule,
        DynamicFormModule,
        LoadingModule,
        StoreModule.forFeature(formFeatureKey, reducer),
        EffectsModule.forFeature([FormEffects]),
        RouterModule.forChild([
            { path: 'form', component: FormListPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
            { path: 'form/add', component: FormBuilderPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
            { path: 'form/:uid', component: EditFormPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
            { path: 'form/:uid/preview', component: FormPreviewPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
        ]),
    ],
    declarations: [
        FormListPageComponent,
        FormListControllerComponent,
        FormListTableComponent,
        AddFormComponent,
        FormListHeaderComponent,
        FileFormControlComponent,
        DateFormControlComponent,
        TimeFormControlComponent,
        EmailFormControlComponent,
        DatetimeFormControlComponent,
        PhoneFormControlComponent,
        NumberFormControlComponent,
        RadioFormControlComponent,
        CheckboxFormControlComponent,
        ToggleFormControlComponent,
        DropdownFormControlComponent,
        ControlSelectionSectionComponent,
        FormControlDirective,
        TextFormControlComponent,
        TextareaFormControlComponent,
        FormBuilderControllerComponent,
        FormBuilderPageComponent,
        FormControlPreivewComponent,
        FormPreviewPageComponent,
        FormPreviewControllerComponent,
        EditFormPageComponent,
        EditFormControllerComponent,
        EditFormComponent,
        FormFieldBuilderControllerComponent,
    ],
})
export class FormModule { }

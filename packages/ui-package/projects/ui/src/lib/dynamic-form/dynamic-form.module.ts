import { ExistingProvider, Injectable, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { SluiButtonModule } from '../button';

import {
    DynamicFormComponent,
    TextFieldComponent,
    TextareaFieldComponent,
    CheckboxFieldComponent,
    DateFieldComponent,
    DatetimeFieldComponent,
    DropdownFieldComponent,
    EmailFieldComponent,
    FileFieldComponent,
    NumberFieldComponent,
    RadioFieldComponent,
    TimeFieldComponent,
    ToggleFieldComponent,
} from './components';
import { DynamicFormControlDirective } from './directive';
import { StorageService } from "./config";

@NgModule({
    imports: [
        CommonModule,
        SluiButtonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        DynamicFormComponent,
        TextFieldComponent,
        DynamicFormControlDirective,
        TextareaFieldComponent,
        CheckboxFieldComponent,
        DateFieldComponent,
        DatetimeFieldComponent,
        DropdownFieldComponent,
        EmailFieldComponent,
        FileFieldComponent,
        NumberFieldComponent,
        RadioFieldComponent,
        TimeFieldComponent,
        ToggleFieldComponent,
    ],
    exports: [
        DynamicFormControlDirective
    ],
})
export class SluiDynamicFormModule {
    static forRoot(config: { storageService: any }): ModuleWithProviders<SluiDynamicFormModule> {
        return {
            ngModule: SluiDynamicFormModule,
            providers: [{ provide: StorageService, useExisting: config.storageService }],
        };
    }
}

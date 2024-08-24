import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SonaleelaFormFieldComponent,
    SonaleelaFormFieldLabel,
    SonaleelaFormFieldError,
    SonaleelaFormFieldHint,
} from './sonaleela-form-field';
import { SonaleelaInputField } from './sonaleela-input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [
        SonaleelaInputField,
        SonaleelaFormFieldComponent,
        SonaleelaFormFieldLabel,
        SonaleelaFormFieldError,
        SonaleelaFormFieldHint,
    ],
    exports: [SonaleelaInputField, SonaleelaFormFieldComponent, SonaleelaFormFieldLabel, SonaleelaFormFieldError, SonaleelaFormFieldHint],
})
export class SonaleelaFormFieldModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { SluiButtonModule } from '@sonaleela/ui';

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
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }

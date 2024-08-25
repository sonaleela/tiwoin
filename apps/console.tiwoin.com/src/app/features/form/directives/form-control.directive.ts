import { Directive, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { FormFieldTypeEnum } from '@models';
import {
  CheckboxFormControlComponent,
  DateFormControlComponent,
  DatetimeFormControlComponent,
  DropdownFormControlComponent,
  EmailFormControlComponent,
  FileFormControlComponent,
  NumberFormControlComponent,
  RadioFormControlComponent,
  TimeFormControlComponent,
  ToggleFormControlComponent,
  TextFormControlComponent,
  TextareaFormControlComponent
} from "../components";

@Directive({
  selector: '[sonaleelaFormControl]'
})
export class FormControlDirective {
  @Input() set sonaleelaFormControl(field: any | null) {
    this.vcr.clear();
    if (!field?.type) return;

    const controlComponent = this.getControlComponent(field?.type);
    const controlComponentRef = this.vcr.createComponent<any>(controlComponent);

    (<any>controlComponentRef.instance).data = field;
    (<any>controlComponentRef.instance).save.subscribe((val: any) => this.save.emit(val));
    (<any>controlComponentRef.instance).remove.subscribe((val: any) => this.remove.emit(val));
  }

  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private vcr: ViewContainerRef) { }

  /**
   * Get form field control component
   * 
   * @param type Form field field control component type
   * @returns 
   */
  getControlComponent(type: FormFieldTypeEnum): any {
    switch (type) {
      case FormFieldTypeEnum.CHECKBOX: return CheckboxFormControlComponent;
      case FormFieldTypeEnum.DATE: return DateFormControlComponent;
      case FormFieldTypeEnum.DATETIME: return DatetimeFormControlComponent;
      case FormFieldTypeEnum.DROPDOWN: return DropdownFormControlComponent;
      case FormFieldTypeEnum.EMAIL: return EmailFormControlComponent;
      case FormFieldTypeEnum.FILE: return FileFormControlComponent;
      case FormFieldTypeEnum.NUMBER: return NumberFormControlComponent
      case FormFieldTypeEnum.RADIO: return RadioFormControlComponent;
      case FormFieldTypeEnum.TEXT: return TextFormControlComponent;
      case FormFieldTypeEnum.TEXTAREA: return TextareaFormControlComponent;
      case FormFieldTypeEnum.TIME: return TimeFormControlComponent;
      case FormFieldTypeEnum.TOGGLE: return ToggleFormControlComponent;
    }
    return TextFormControlComponent;
  }
}

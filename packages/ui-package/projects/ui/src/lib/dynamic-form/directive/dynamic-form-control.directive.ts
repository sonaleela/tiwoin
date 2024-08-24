import { ComponentRef, Directive, forwardRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormFieldTypeEnum } from '../models';
import { Subscription } from 'rxjs';

import {
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
} from '../components'
import { DynamicField } from '../components/field';

@Directive({
    selector: '[sluiDynamicFormControl]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DynamicFormControlDirective),
        multi: true,
    }]
})
export class DynamicFormControlDirective implements ControlValueAccessor, OnDestroy {
    changeFunction: Function = (): void => { };
    touchedFuntion: Function = (): void => { };
    subscriptions: any[] = [];

    controlComponentRef: ComponentRef<DynamicField> | null = null;

    constructor(private vcr: ViewContainerRef) { }

    registerOnChange(fn: any): void {
        this.changeFunction = fn;
    }

    registerOnTouched(fn: any): void {
        this.touchedFuntion = fn;
    }

    setDisabledState(isDisabled: boolean) {
        // isDisabled ? this.controlComponentRef?.instance?.form.disable() : this.controlComponentRef?.instance?.form.enable();
    }

    writeValue(value: any): void {
        this.createControlComponent(value);
    }

    createControlComponent(field: any) {
        this.vcr.clear();
        if (!field?.type) return;

        const controlComponent = this.getControlComponent(field?.type);
        this.controlComponentRef = this.vcr.createComponent(controlComponent);

        this.controlComponentRef.instance.data = field;
        const subscirpiton = this.controlComponentRef.instance.valueChange.subscribe((val: any) => {
            this.changeFunction(val);
        });
        this.subscriptions.push(subscirpiton);
    }

    getControlComponent(type: FormFieldTypeEnum): any {
        switch (type) {
            case FormFieldTypeEnum.CHECKBOX: return CheckboxFieldComponent;
            case FormFieldTypeEnum.DATE: return DateFieldComponent;
            case FormFieldTypeEnum.DATETIME: return DatetimeFieldComponent;
            case FormFieldTypeEnum.DROPDOWN: return DropdownFieldComponent;
            case FormFieldTypeEnum.EMAIL: return EmailFieldComponent;
            case FormFieldTypeEnum.FILE: return FileFieldComponent;
            case FormFieldTypeEnum.NUMBER: return NumberFieldComponent
            case FormFieldTypeEnum.RADIO: return RadioFieldComponent;
            case FormFieldTypeEnum.TEXT: return TextFieldComponent;
            case FormFieldTypeEnum.TEXTAREA: return TextareaFieldComponent
            case FormFieldTypeEnum.TIME: return TimeFieldComponent
            case FormFieldTypeEnum.TOGGLE: return ToggleFieldComponent
        }
        return TextFieldComponent;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}

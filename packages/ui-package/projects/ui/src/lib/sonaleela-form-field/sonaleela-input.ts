import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, DoCheck, ElementRef, HostBinding, HostListener, Input, Optional, Self } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';

import { SonaleelaFormFieldControl } from './sonaleela-form-field-control';

@Component({
    selector: '[libSonaleelaInputControl]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./sonaleela-input.scss'],
    providers: [{ provide: SonaleelaFormFieldControl, useExisting: SonaleelaInputField }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[required]': 'required',
    },
})
export class SonaleelaInputField implements SonaleelaFormFieldControl<any>, DoCheck {
    @HostBinding('class.sonaleela-input') input = true;

    value = null;

    readonly stateChanges: Subject<void> = new Subject<void>();

    placeholder = '';

    focused = false;

    private _required: boolean | string = false;
    @Input() set required(value: boolean | string) {
        this._required = coerceBooleanProperty(value);
    }
    get required() {
        return this._required;
    }

    private _disabled: boolean | string = false;
    @Input() set disabled(value: boolean | string) {
        this._disabled = value;
        if (this.focused) {
            this.focused = false;
        }
    }
    get disabled() {
        return this.ngControl && this.ngControl.disabled !== null ? this.ngControl.disabled : this._disabled;
    }

    readonly = false;

    errorState = false;

    autoFilled = false;

    constructor(
        @Optional() @Self() public ngControl: NgControl,
        private elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        private errorStateMatcher: ErrorStateMatcher,
        private parentFormGroup: FormGroupDirective,
        @Optional() private parentForm: NgForm,
    ) {
        const element = this.elementRef.nativeElement;
        const nodeName = element.nodeName.toLowerCase();
    }

    @HostListener('focus', ['true'])
    @HostListener('blur', ['false'])
    focusChanged(isFocused: boolean) {
        if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
            this.focused = isFocused;
        }
    }

    updateErrorState() {
        const oldState = this.errorState;
        const parent = this.parentFormGroup || this.parentForm;
        const matcher = this.errorStateMatcher;
        const control = this.ngControl ? (this.ngControl.control as UntypedFormControl) : null;
        const newState = matcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    }

    ngDoCheck() {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }
}

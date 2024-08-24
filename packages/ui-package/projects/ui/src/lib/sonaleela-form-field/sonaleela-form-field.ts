import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    HostBinding,
    QueryList,
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { SonaleelaFormFieldControl } from './sonaleela-form-field-control';

@Component({
    selector: 'lib-sonaleela-control-label, [libSonaleelaControlLabel]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./sonaleela-form-field-lable.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonaleelaFormFieldLabel {
    @HostBinding('class.sonaleela-label') label = true;
}

@Component({
    selector: '[lib-sonaleela-form-error]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./sonaleela-form-field-error.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonaleelaFormFieldError {
    @HostBinding('class.sonaleela-error') label = true;
}

@Component({
    selector: 'libSonaleelaControlHint',
    template: '<ng-content></ng-content>',
    styleUrls: ['./sonaleela-form-field-hint.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonaleelaFormFieldHint {
    @HostBinding('class.sonaleela-hint') label = true;
}

@Component({
    selector: 'lib-sonaleela-form-field, [libSonaleelaFormControl]',
    templateUrl: './sonaleela-form-field.html',
    styleUrls: ['./sonaleela-form-field.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonaleelaFormFieldComponent implements AfterContentInit {
    @ContentChild(SonaleelaFormFieldControl) formControl: SonaleelaFormFieldControl<any> | undefined;
    @ContentChild(SonaleelaFormFieldLabel) controlLabel: SonaleelaFormFieldLabel | undefined;
    @ContentChildren(SonaleelaFormFieldError, { descendants: true }) controlError: QueryList<SonaleelaFormFieldError> | undefined;
    @ContentChild(SonaleelaFormFieldHint) controlHint: SonaleelaFormFieldHint | undefined;

    @HostBinding('class.focused') get isFocused() {
        return this.formControl?.focused;
    }

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.missingFormControl();

        this.formControl?.stateChanges.pipe(startWith(null!)).subscribe(() => {
            this.cdr.markForCheck();
        });
    }

    getDisplayedMessages(): 'error' | 'hint' {
        return this.controlError && this.controlError.length > 0 && this.formControl?.errorState ? 'error' : 'hint';
    }

    missingFormControl(): any {
        if (!this.formControl) {
            throw new Error('lib-sonaleela-form-field must contain a form field');
        }
    }
}

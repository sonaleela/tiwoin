import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormFieldTypeEnum } from '@models';

@Component({
    selector: 'sonaleela-phone-form-control',
    exportAs: 'PhoneFormControl',
    templateUrl: './phone-form-control.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneFormControlComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set data(data: any) {
        if (!data) return;
        this.form.patchValue(data);
    }
    @Output() remove = new EventEmitter<boolean>();
    @Output() save = new EventEmitter<any>();

    changeFunction: any = (): void => { };
    touchedFuntion: any = (): void => { };

    form = this.formBuilder.group({
        id: '',
        label: ['', Validators.required],
        type: FormFieldTypeEnum.PHONE,
        caption: '',
        description: this.formBuilder.group({ isIcon: false, text: '' }),
        image: this.formBuilder.group({ src: '' }),
        placeholder: '',
        validators: this.formBuilder.group({
            required: this.formBuilder.group({ errorMessage: [''], isRequired: [false] }),
        }),
        value: '',
    });

    saveField() {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;
        this.save.emit(this.form.value);
    }
}

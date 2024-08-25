import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormFieldTypeEnum } from '@models';

@Component({
    selector: 'sonaleela-textarea-form-control',
    templateUrl: './textarea-form-control.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaFormControlComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set data(data: any) {
        if (!data) return;
        this.form.patchValue(data);
    }
    @Output() remove = new EventEmitter<boolean>();
    @Output() save = new EventEmitter<any>();

    form = this.formBuilder.group({
        id: [''],
        label: ['', Validators.required],
        type: [FormFieldTypeEnum.TEXTAREA],
        caption: [''],
        description: this.formBuilder.group({ isIcon: [false], text: [''] }),
        image: this.formBuilder.group({ src: [''] }),
        placeholder: [''],
        value: [''],
        validators: this.formBuilder.group({
            required: this.formBuilder.group({ errorMessage: [''], isRequired: [false] }),
        }),
        cols: 0,
        rows: 3,
    });

    saveField() {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;
        this.save.emit(this.form.value);
    }
}

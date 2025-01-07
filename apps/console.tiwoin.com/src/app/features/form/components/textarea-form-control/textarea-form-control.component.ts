import { Component, ChangeDetectionStrategy, Input, inject, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormFieldTypeEnum } from '@models';

@Component({
    selector: 'sonaleela-textarea-form-control',
    templateUrl: './textarea-form-control.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TextareaFormControlComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set data(data: any) {
        if (!data) return;
        this.form.patchValue(data);
    }
    readonly remove = output<boolean>();
    readonly save = output<any>();

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

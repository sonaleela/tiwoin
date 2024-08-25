import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormFieldTypeEnum } from '@models';

@Component({
    selector: 'sonaleela-time-form-control',
    exportAs: 'TimeFormControl',
    templateUrl: './time-form-control.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeFormControlComponent {
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
        type: FormFieldTypeEnum.TIME,
        caption: [''],
        description: this.formBuilder.group({ isIcon: [false], text: [''] }),
        image: this.formBuilder.group<{ src: FormControl }>({ src: this.formBuilder.control(null) }),
        placeholder: [''],
        value: [''],
        validators: this.formBuilder.group({
            min: this.formBuilder.group({ errorMessage: [''], min: [''] }),
            max: this.formBuilder.group({ errorMessage: [''], max: [''] }),
            required: this.formBuilder.group({ errorMessage: [''], isRequired: [false] }),
        }),
    });

    saveField() {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;
        this.save.emit(this.form.value);
    }

    changeFile(event: Event) {
        const files = (<HTMLInputElement>event?.target)?.files;
        if (files?.length) this.form.get('image')?.patchValue({ src: files });
    }
}

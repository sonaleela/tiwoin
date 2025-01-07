import { ChangeDetectionStrategy, Component, inject, Input, output } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormFieldTypeEnum } from '@models';

@Component({
    selector: 'sonaleela-file-form-control',
    exportAs: 'FileFormControl',
    templateUrl: './file-form-control.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FileFormControlComponent {
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
        type: [FormFieldTypeEnum.FILE],
        caption: [''],
        description: this.formBuilder.group({ isIcon: [false], text: [''] }),
        image: this.formBuilder.group<{ src: FormControl }>({ src: this.formBuilder.control(null) }),
        placeholder: [''],
        value: [''],
        validators: this.formBuilder.group({
            required: this.formBuilder.group({ errorMessage: [''], isRequired: [false] }),
            multiple: false,
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

import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { v4 as uuid } from "uuid";
import { FormFieldTypeEnum } from '@models';

@Component({
    selector: 'sonaleela-dropdown-form-control',
    exportAs: 'DropdownFormControl',
    templateUrl: './dropdown-form-control.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownFormControlComponent {
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
        type: FormFieldTypeEnum.DROPDOWN,
        caption: [''],
        description: this.formBuilder.group({ isIcon: [false], text: [''] }),
        image: this.formBuilder.group<{ src: FormControl }>({ src: this.formBuilder.control(null) }),
        placeholder: [''],
        value: [''],
        validators: this.formBuilder.group({
            required: this.formBuilder.group({ errorMessage: '', isRequired: false }),
        }),
        controls: this.formBuilder.array([this.formBuilder.group({
            id: [uuid()],
            label: ['value 1', Validators.required],
            description: [''],
            checked: false
        })]),
    });

    get controlsArray() {
        return this.form.get('controls') as FormArray<FormGroup>;
    }

    addControl(index: number) {
        this.controlsArray.insert(index ? index + 1 : this.controlsArray.length, this.formBuilder.group({
            id: [uuid()],
            label: [`value ${this.controlsArray.length + 1}`, Validators.required],
            description: [''],
            checked: false
        }));
    }

    removeControl(index: number) {
        this.controlsArray.removeAt(index);
    }

    changeFile(event: Event) {
        const files = (<HTMLInputElement>event?.target)?.files;
        if (files?.length) this.form.get('image')?.patchValue({ src: files });
    }

    saveField() {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;
        this.save.emit(this.form.value);
    }
}

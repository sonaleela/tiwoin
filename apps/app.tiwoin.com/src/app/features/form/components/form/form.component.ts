import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'tiwoin-form',
    templateUrl: './form.component.html',
    styles: [':host { @apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
    private _data: any = null;
    @Input() set data(data: any | null) {
        if (!data) return;
        this.patchForm(data);
    }
    get data() { return this._data; }
    @Input() isPending: boolean | null = null;

    @Output() submitForm = new EventEmitter();

    private formBuilder: FormBuilder = inject(FormBuilder);
    form = this.formBuilder.group({
        name: '',
        fields: this.formBuilder.array([]),
        formId: ['', Validators.required],
        form: ['', Validators.required],
    });

    get fields() {
        return this.form.get('fields') as FormArray;
    }

    patchForm(data: any) {
        this._data = data;

        data?.fields.map((_: any) => {
            const control = this.formBuilder.control('');
            this.fields.push(control);
        });

        this.form.patchValue({
            name: data.name,
            formId: data.id,
            fields: data.fields,
            form: data,
        });
    }

    submit() {
        if (this.form.invalid) return;

        this.submitForm.emit(this.form.value);
    }
}

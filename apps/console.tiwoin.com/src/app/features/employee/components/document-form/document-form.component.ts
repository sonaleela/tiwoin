import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

interface DocumentForm {
    name: FormControl<string>,
    files: FormControl<string[]>,
}

@Component({
    selector: 'sonaleela-document-form',
    templateUrl: './document-form.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending = false;
    @Input() error = '';

    @Output() submitForm = new EventEmitter<(typeof this.form.value)>();
    @Output() cancel = new EventEmitter<boolean>();

    form = this.formBuilder.nonNullable.group<DocumentForm>({
        name: this.formBuilder.nonNullable.control('', Validators.required),
        files: this.formBuilder.nonNullable.control([''], Validators.required),
    })

    submit() {
        if (this.form.invalid) return;

        this.submitForm.emit(this.form.value);
    }
}

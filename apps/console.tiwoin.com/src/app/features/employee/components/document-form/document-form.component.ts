import { ChangeDetectionStrategy, Component, inject, OnInit, input, output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

interface DocumentForm {
    name: FormControl<string>,
    files: FormControl<string[]>,
}

@Component({
    selector: 'sonaleela-document-form',
    templateUrl: './document-form.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DocumentFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input(false);
    readonly error = input('');

    readonly submitForm = output<(typeof this.form.value)>();
    readonly cancel = output<boolean>();

    form = this.formBuilder.nonNullable.group<DocumentForm>({
        name: this.formBuilder.nonNullable.control('', Validators.required),
        files: this.formBuilder.nonNullable.control([''], Validators.required),
    })

    submit() {
        if (this.form.invalid) return;

        this.submitForm.emit(this.form.value);
    }
}

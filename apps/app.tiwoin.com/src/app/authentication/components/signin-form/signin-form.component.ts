import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'tiwoin-signin-form',
    templateUrl: './signin-form.component.html',
    styles: [`:host { @apply flex items-center justify-center w-full h-full bg-gray-75 px-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninFormComponent {
    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;
    @Output() submitForm = new EventEmitter<{ username: string; }>();

    private formBuilder: FormBuilder = inject(FormBuilder);
    form = this.formBuilder.group({
        username: ['', Validators.required],
    });
    constructor() { }

    submit() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }
        this.submitForm.emit({ username: `+91${this.form.value.username}` });
    }
}

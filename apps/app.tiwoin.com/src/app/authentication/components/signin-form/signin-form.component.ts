import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'tiwoin-signin-form',
    templateUrl: './signin-form.component.html',
    styles: [`:host { @apply flex items-center justify-center w-full h-full bg-gray-75 px-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SigninFormComponent {
    /**
     * Input
     */
    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);

    /**
     * Output
     */
    readonly submitForm = output<{ username: string; }>();

    /**
     * Inject
     */
    private formBuilder: FormBuilder = inject(FormBuilder);

    form = this.formBuilder.group({
        username: ['', Validators.required],
    });

    submit() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }
        this.submitForm.emit({ username: `+91${this.form.value.username}` });
    }
}

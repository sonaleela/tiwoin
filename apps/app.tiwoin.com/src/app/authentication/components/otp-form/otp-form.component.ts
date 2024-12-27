import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'tiwoin-otp-form',
    templateUrl: './otp-form.component.html',
    styles: [`:host { @apply flex items-center justify-center w-full h-full bg-gray-75 px-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OtpFormComponent {
    /**
     * Input
     */
    readonly isPending = input<boolean | null>(null);
    readonly phoneNumber = input<string | null>(null);
    readonly error = input<string | null>(null);
    readonly timer = input<number | null>(null);

    /**
     * Output
     */
    readonly submitForm = output<{ otp: string }>();
    readonly editPhoneNumber = output<boolean>();

    /**
     * Inject
     */
    private formBuilder: FormBuilder = inject(FormBuilder);

    form = this.formBuilder.group({
        otp: ['', Validators.required],
    });

    submit() {
        if (this.form.invalid) return;

        this.submitForm.emit({ otp: `${this.form.get('otp')?.value}` });
    }
}

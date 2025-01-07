import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-otp-form',
    templateUrl: './otp-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OtpFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly phoneNumber = input<string | null>(null);
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');
    readonly timer = input<number | null>(null);

    readonly submitForm = output<{
    otp: string;
}>();
    readonly editPhoneNumber = output<boolean>();

    form = this.formBuilder.group({
        otp: ['', Validators.required],
    });

    submit() {
        if (!this.form.valid) {
            return;
        }

        this.submitForm.emit({ otp: `${this.form.get('otp')?.value}` });
    }
}

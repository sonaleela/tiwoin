import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output, input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'tiwoin-otp-form',
    templateUrl: './otp-form.component.html',
    styles: [`:host { @apply flex items-center justify-center w-full h-full bg-gray-75 px-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OtpFormComponent {
    readonly isPending = input<boolean | null>(null);
    readonly phoneNumber = input<string | null>(null);
    readonly error = input<string | null>(null);
    readonly timer = input<number | null>(null);

    @Output() submitForm = new EventEmitter();
    @Output() editPhoneNumber = new EventEmitter();

    private formBuilder: FormBuilder = inject(FormBuilder);
    form = this.formBuilder.group({
        otp: ''
    });

    constructor() { }

    submit() {
        if (this.form.invalid) return;

        this.submitForm.emit({ otp: `${this.form.get('otp')?.value}` });
    }
}

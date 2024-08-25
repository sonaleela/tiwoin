import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-otp-form',
    templateUrl: './otp-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() phoneNumber: string | null = null;
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';
    @Input() timer: number | null = null;

    @Output() submitForm = new EventEmitter<{ otp: string; }>();
    @Output() editPhoneNumber = new EventEmitter<boolean>();

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

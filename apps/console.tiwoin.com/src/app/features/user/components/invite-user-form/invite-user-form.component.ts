import { ChangeDetectionStrategy, Component, inject, OnInit, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-invite-user-form',
    templateUrl: './invite-user-form.component.html',
    styles: [`:host {display: block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InviteUserFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');

    readonly submitForm = output<typeof this.form.value>();

    form = this.formBuilder.group({
        countryCode: ['+91', Validators.required],
        phoneNumber: ['', Validators.required],
        role: ['', Validators.required],
    });

    submit() {
        if (this.form.invalid) return;

        this.submitForm.emit({
            ...this.form.value,
            phoneNumber: `${this.form.get('countryCode')?.value}${this.form.get('phoneNumber')?.value}`
        });
    }
}

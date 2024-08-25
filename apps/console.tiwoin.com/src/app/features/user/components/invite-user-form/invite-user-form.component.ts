import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-invite-user-form',
    templateUrl: './invite-user-form.component.html',
    styles: [`:host {display: block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteUserFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';

    @Output() submitForm = new EventEmitter();

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

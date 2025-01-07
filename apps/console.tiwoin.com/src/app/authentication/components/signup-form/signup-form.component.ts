import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid } from "uuid";
import { SignupPayloadModel } from '@models';

@Component({
    selector: 'sonaleela-signup-form',
    templateUrl: './signup-form.component.html',
    styles: [`:host {@apply block;}`],
    standalone: false
})
export class SignupFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');
    readonly submitForm = output<SignupPayloadModel>();

    form = this.formBuilder.nonNullable.group({
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        phone_number: ['', Validators.required],
        password: [uuid()],
        countryCode: ['+91', Validators.required],
    });

    submit() {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;
        const { countryCode, ...payload } = {
            ...this.form.value,
            phone_number: `${this.form.value.countryCode}${this.form.value.phone_number}`
        }
        this.submitForm.emit(payload);
    }
}

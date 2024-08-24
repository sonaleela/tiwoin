import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid } from "uuid";

import { SignupPayloadModel } from '@models';

@Component({
    selector: 'tiwoin-signup-form',
    templateUrl: './signup-form.component.html',
    styles: [':host {@apply flex items-center justify-center w-full h-full bg-gray-75 px-6;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';
    @Output() submitForm = new EventEmitter<SignupPayloadModel>();

    private formBuilder: FormBuilder = inject(FormBuilder);
    form = this.formBuilder.nonNullable.group({
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        phone_number: ['', Validators.required],
        password: [uuid()],
    });
    constructor() { }

    submit() {
        if (!this.form.valid) return;
        this.submitForm.emit({
            ...this.form.value,
            phone_number: `+91${this.form.value.phone_number}`
        });
    }
}

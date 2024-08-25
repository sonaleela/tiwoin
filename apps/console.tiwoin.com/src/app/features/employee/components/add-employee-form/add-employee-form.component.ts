import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';

import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-add-employee-form',
    templateUrl: './add-employee-form.component.html',
    styles: [`:host { @apply block;}`],
})
export class AddEmployeeFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';

    @Output() submitForm = new EventEmitter<any>();

    form = this.formBuilder.group({
        name: this.formBuilder.group({
            first: ['', Validators.required],
            middle: [''],
            last: [''],
        }),
        countryCode: ['+91', Validators.required],
        phoneNumber: ['', Validators.required],

        employementStatus: 'Active'
    });

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        this.submitForm.emit({
            ...this.form.value,
            phoneNumber: `${this.form.value?.countryCode}${this.form.value?.phoneNumber}`,
        });
    }
}

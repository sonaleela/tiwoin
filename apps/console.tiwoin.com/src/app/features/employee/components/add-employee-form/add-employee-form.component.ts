import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';

import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-add-employee-form',
    templateUrl: './add-employee-form.component.html',
    styles: [`:host { @apply block;}`],
    standalone: false
})
export class AddEmployeeFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');

    readonly submitForm = output<any>();

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

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, UntypedFormArray, UntypedFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { IndustryList, EmployeeRangeList, OrganizationModel } from '@models';

interface OrganizationForm {
    name: FormControl<string>,
    industry: FormArray<FormControl<boolean>>,
    employeeRange: FormControl<{ range: string, selected?: boolean }>,
    cin: FormControl<string>,
    gst: FormControl<string>,
    email: FormArray<FormControl<string>>,
    phone: FormArray<FormControl<string>>,
}

@Component({
    selector: 'sonaleela-organization-form',
    templateUrl: './organization-form.component.html',
    styles: [':host { @apply block px-6;}'],
})
export class OrganizationFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';

    @Output() submitForm = new EventEmitter<OrganizationModel>();

    industryList = [...IndustryList];
    employeeRangeList = [...EmployeeRangeList];
    form = this.formBuilder.nonNullable.group<OrganizationForm>({
        name: this.formBuilder.nonNullable.control('', Validators.required),
        industry: this.formBuilder.nonNullable.array(IndustryList.map((ind) => this.formBuilder.nonNullable.control(ind.selected || false))),
        employeeRange: this.formBuilder.nonNullable.control(this.employeeRangeList[this.employeeRangeList.length - 1]),
        cin: this.formBuilder.nonNullable.control(''),
        gst: this.formBuilder.nonNullable.control(''),
        email: this.formBuilder.nonNullable.array([this.formBuilder.nonNullable.control('')]),
        phone: this.formBuilder.nonNullable.array([this.formBuilder.nonNullable.control('')]),
    });

    get email() {
        return <UntypedFormArray>this.form.get('email');
    }
    get phone() {
        return <UntypedFormArray>this.form.get('phone');
    }
    get industry() {
        return <UntypedFormArray>this.form.get('industry');
    }
    isLoading = false;

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }
        this.submitForm.emit({
            ...this.form.value,
            name: this.form.value.name || '',
            employeeRange: this.form.value.employeeRange?.range,
            industry: this.industryList.filter((_, i) => this.industry.controls[i].value).map((i) => i.name),
            email: this.form.value.email?.filter(email => !!email),
            phone: this.form.value.phone?.filter(phone => !!phone),
        });
    }

    addEmail() {
        this.email.push(this.formBuilder.control('', Validators.required));
    }
    removeEmail(i: number) {
        this.email.removeAt(i);
    }

    addPhone() {
        this.phone.push(this.formBuilder.control('', Validators.required));
    }
    removePhone(i: number) {
        this.phone.removeAt(i);
    }
}

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-personal-profile',
    templateUrl: './personal-profile.component.html',
    styles: [':host {@apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalProfileComponent {
    private formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);

    @Input() employee?: EmployeeModel | null;
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;

    @Output() editEmployee = new EventEmitter();

    isGeneralForm: boolean | null = false;
    generalForm = this.formBuilder.group({
        name: this.formBuilder.group({
            first: this.formBuilder.control('', Validators.required),
            middle: this.formBuilder.control(''),
            last: this.formBuilder.control(''),
        }),
        dateOfBirth: [null],
        gender: [],
    });

    isContactForm: boolean | null = false;
    contactFrom = this.formBuilder.group({
        emails: this.formBuilder.array([this.formBuilder.control('')]),
        phones: this.formBuilder.array([this.formBuilder.control('')]),
        address: this.formBuilder.group({
            line1: [''],
            line2: [''],
            city: [''],
            state: [''],
            postalCode: [''],
            country: [''],
        }),
    })

    get emails() {
        return <UntypedFormArray>this.contactFrom.get('emails');
    }
    get phones() {
        return <UntypedFormArray>this.contactFrom.get('phones');
    }

    addEmail() {
        this.emails.push(this.formBuilder.control('', Validators.required));
    }
    removeEmail(i: number) {
        this.emails.removeAt(i);
    }

    addPhone() {
        this.phones.push(this.formBuilder.control('', Validators.required));
    }
    removePhone(i: number) {
        this.phones.removeAt(i);
    }

    editGeneralInfo() {
        this.isGeneralForm = true;
        this.generalForm.patchValue(this.employee || {});
    }

    editContactInfo() {
        this.isContactForm = true;
        let patchValue: any = { ...JSON.parse(JSON.stringify(this.employee)) };
        if (this.employee?.emails?.length) {
            (<FormArray>this.contactFrom.get('emails')).clear();
            patchValue = {
                ...patchValue,
                emails: patchValue?.emails.map((item: any) => {
                    this.addEmail();
                    return item.email;
                })
            };
        }
        if (this.employee?.phones?.length) {
            (<FormArray>this.contactFrom.get('phones')).clear();
            patchValue = {
                ...patchValue,
                phones: this.employee.phones.map(item => {
                    this.addPhone();
                    return item.phone;
                })
            };
            this.removePhone(this.employee?.phones?.length)
        }
        this.contactFrom.patchValue(patchValue);
    }

    submitGeneral() {
        if (this.generalForm.invalid) return;

        this.editEmployee.emit(this.generalForm.value);
    }

    submitContact() {
        const body = this.contactFrom.value;
        if (this.contactFrom.invalid) return;
        if (!this.contactFrom.get('address')?.get('line1')?.value) delete body.address;
        body.emails = body.emails.map((email: string) => ({ email, isPrimary: false }));
        body.phones = body.phones.map((phone: string) => ({ phone, isPrimary: false }));
        this.editEmployee.emit(body);
    }
}

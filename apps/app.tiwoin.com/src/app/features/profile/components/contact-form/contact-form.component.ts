import { ChangeDetectionStrategy, Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { EmployeeModel } from '@models';

@Component({
    selector: 'tiwoin-contact-form',
    templateUrl: './contact-form.component.html',
    styles: [`:host { @apply block p-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ContactFormComponent {
    /**
     * Input
     */
    @Input() set profile(profile: EmployeeModel | null | any) {
        if (!profile) return;
        this.patchForm(profile);
    }
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');

    /**
     * Output
     */
    readonly submitForm = output<Partial<EmployeeModel> | any>();
    readonly toggleForm = output<boolean>();

    /**
     * Inject
     */
    private formBuilder: FormBuilder = inject(FormBuilder);

    form = this.formBuilder.group({
        id: ['', Validators.required],
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
    });

    get emails() {
        return <UntypedFormArray>this.form.get('emails');
    }
    get phones() {
        return <UntypedFormArray>this.form.get('phones');
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

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;
        const body = this.form.value;
        if (!this.form.get('address')?.get('line1')?.value) delete body.address;
        if (body.emails?.length) body.emails = body.emails?.filter(v => !!v).map<any>((email) => ({ email, isPrimary: false }));
        if (body.phones?.length) body.phones = body.phones?.filter(v => !!v).map<any>((phone) => ({ phone, isPrimary: false }));

        this.submitForm.emit(this.form.value);
    }

    patchForm(profile: any) {
        let patchValue = { ...profile };
        if (profile?.emails?.length) {
            patchValue = {
                ...patchValue,
                emails: profile.emails.map((item: { email: any; }) => {
                    this.addEmail();
                    return item.email;
                })
            };
            this.removeEmail(profile?.emails?.length);
        }
        if (profile?.phones?.length) {
            patchValue = {
                ...patchValue,
                phones: profile.phones.map((item: { phone: any; }) => {
                    this.addPhone();
                    return item.phone;
                })
            };
            this.removePhone(profile?.phones?.length)
        }
        this.form.patchValue(patchValue);
    }
}

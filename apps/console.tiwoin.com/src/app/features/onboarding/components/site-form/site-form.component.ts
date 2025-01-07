import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { SiteModel } from '@models';

interface SiteForm {
    name: FormControl<string>,
    address: FormGroup<{
        line1: FormControl<string>,
        line2: FormControl<string>,
        city: FormControl<string>,
        state: FormControl<string>,
        postalCode: FormControl<string>,
        country: FormControl<string>,
    }>
}

@Component({
    selector: 'sonaleela-site-form',
    templateUrl: './site-form.component.html',
    styles: [':host { @apply block px-6;}'],
    standalone: false
})
export class SiteFormComponent {
    private formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set site(data: SiteModel | null) {
        if (!data) return;
        this.form.patchValue(data);
    }
    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set state(data: string | null) {
        if (!data) return;
        this.form.get('address.state')?.setValue(data);
    }
    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set country(data: string | null) {
        if (!data) return;
        this.form.get('address.country')?.setValue(data)
    }
    readonly cityList = input<string[] | null>([]);

    readonly submitForm = output<Partial<SiteModel>>();
    readonly pinChange = output<number>();
    readonly addresssChange = output<{
    address: string;
    postalCode: string;
}>();

    form = this.formBuilder.nonNullable.group<SiteForm>({
        name: this.formBuilder.nonNullable.control('', Validators.required),
        address: this.formBuilder.nonNullable.group({
            line1: this.formBuilder.nonNullable.control('', Validators.required),
            line2: this.formBuilder.nonNullable.control(''),
            city: this.formBuilder.nonNullable.control('', Validators.required),
            state: this.formBuilder.nonNullable.control('', Validators.required),
            postalCode: this.formBuilder.control(null, Validators.required),
            country: this.formBuilder.nonNullable.control('', Validators.required),
        }),
    });

    constructor() {
        this.form.get('address.postalCode')?.valueChanges.subscribe(pincode => {
            if (!pincode || +pincode < 100000) return;
            this.pinChange.emit(+pincode);
        });
        this.form.get('address.city')?.valueChanges.subscribe(city => {
            let address = '';
            if (this.form.get('address.line1')?.value) {
                address = `${this.form.get('address.line1')?.value}, `;
            }
            if (this.form.get('address.line2')?.value) {
                address = `${address}${this.form.get('address.line2')?.value}, `;
            }
            address = `${address}${city}`;
            this.addresssChange.emit({ address, postalCode: this.form.controls.address.controls.postalCode.value });
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;

        this.submitForm.emit({
            name: this.form.value.name || '',
            address: {
                line1: this.form.value.address?.line1 || '',
                line2: this.form.value.address?.line2 || '',
                city: this.form.value.address?.city || '',
                state: this.form.value.address?.state || '',
                postalCode: `${this.form.get('address')?.get('postalCode')?.value}` || '',
                country: this.form.value.address?.country || '',
            }
        });
    }
}

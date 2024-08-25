import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

import { SiteModel } from '@models';

@Component({
    selector: 'sonaleela-add-site-form',
    templateUrl: './add-site-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSiteFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set site(data: SiteModel | null) {
        if (!data) return;
        this.form.patchValue(data);
    }
    @Input() set state(data: string | null) {
        if (!data) return;
        this.form.get('address.state')?.setValue(data);
    }
    @Input() set country(data: string | null) {
        if (!data) return;
        this.form.get('address.country')?.setValue(data)
    }
    @Input() cityList: string[] | null = [];
    @Input() organizationId: string | null = '';

    @Output() submitForm = new EventEmitter<any>();
    @Output() pinChange = new EventEmitter<string>();
    @Output() addresssChange = new EventEmitter<{ address: string, postalCode: string }>();

    form = this.formBuilder.group({
        name: ['', Validators.required],
        address: this.formBuilder.group({
            line1: ['', Validators.required],
            line2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', Validators.required],
            country: ['', Validators.required],
        }),
    });

    constructor() {
        this.form.get('address.postalCode')?.valueChanges.subscribe(pincode => {
            if (!pincode || +pincode < 100000) return;
            this.pinChange.emit(pincode);
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
            this.addresssChange.emit({ address, postalCode: this.form.controls.address?.get('postalCode')?.value || '' });
        });
    }

    submit() {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;
        const body = { ...this.form.value, address: { ...this.form.get('address')?.value, postalCode: `${this.form.get('address')?.get('postalCode')?.value}` } };

        this.submitForm.emit(body);
    }
}

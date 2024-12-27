import { ChangeDetectionStrategy, Component, computed, inject, Input, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeModel } from '@models';

@Component({
    selector: 'tiwoin-profile-form',
    templateUrl: './profile-form.component.html',
    styles: [`:host { @apply block p-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProfileFormComponent {
    /**
     * Input
     */
    readonly profile = input<EmployeeModel | null>(null);
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

    form = computed(() => {
        const form = this.formBuilder.group({
            id: ['', Validators.required],
            name: this.formBuilder.group({
                first: this.formBuilder.control('', Validators.required),
                middle: this.formBuilder.control(''),
                last: this.formBuilder.control(''),
            }),
            phoneNumber: [''],
            dateOfBirth: [''],
            gender: ['Other'],
        });
        const profile = this.profile();
        console.log({ profile });
        if (profile) form.patchValue(profile);
        return form;
    })

    submit() {
        this.form().markAllAsTouched();
        if (this.form().invalid) return;

        this.submitForm.emit(this.form().value);
    }
}

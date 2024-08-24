import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeModel } from '@models';

@Component({
    selector: 'tiwoin-profile-form',
    templateUrl: './profile-form.component.html',
    styles: [`:host { @apply block p-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent {
    @Input() set profile(profile: EmployeeModel | null | any) {
        if (!profile) return;
        this.form.patchValue(profile);
    }
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';

    @Output() submitForm = new EventEmitter<Partial<EmployeeModel> | any>();
    @Output() toggleForm = new EventEmitter<boolean>();

    private formBuilder: FormBuilder = inject(FormBuilder);
    form = this.formBuilder.group({
        id: ['', Validators.required],
        name: this.formBuilder.group({
            first: this.formBuilder.control('', Validators.required),
            middle: this.formBuilder.control(''),
            last: this.formBuilder.control(''),
        }),
        phoneNumber: [''],
        dateOfBirth: [null],
        gender: ['Other'],
    });

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        this.submitForm.emit(this.form.value);
    }
}

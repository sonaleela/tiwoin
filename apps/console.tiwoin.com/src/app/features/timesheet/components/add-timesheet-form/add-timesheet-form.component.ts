import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'sonaleela-add-timesheet-form',
    templateUrl: './add-timesheet-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AddTimesheetFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);
    readonly submitForm = output<any>();

    form = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        type: this.formBuilder.control({ value: 'Break', disabled: true }),
        isActive: true,
    });

    submit() {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;

        this.submitForm.emit(this.form.getRawValue());
    }
}

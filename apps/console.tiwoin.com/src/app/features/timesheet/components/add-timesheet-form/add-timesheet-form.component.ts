import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'sonaleela-add-timesheet-form',
    templateUrl: './add-timesheet-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTimesheetFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;
    @Output() submitForm = new EventEmitter<any>();

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

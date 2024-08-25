import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'sonaleela-edit-timesheet-form',
    templateUrl: './edit-timesheet-form.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTimesheetFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set timesheet(value: any) {
        if (!value) return;

        this.form.patchValue(value);
    }
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';

    @Output() submitForm = new EventEmitter();

    form = this.formBuilder.group({
        id: '',
        organizationId: '',
        name: '',
        description: '',
        isActive: true,
    });

    submit() {
        if (!this.form.valid) return;

        this.submitForm.emit(this.form.value);
    }
}

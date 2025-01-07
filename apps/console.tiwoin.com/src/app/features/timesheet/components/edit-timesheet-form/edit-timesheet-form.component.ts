import { ChangeDetectionStrategy, Component, inject, Input, OnInit, input, output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'sonaleela-edit-timesheet-form',
    templateUrl: './edit-timesheet-form.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EditTimesheetFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set timesheet(value: any) {
        if (!value) return;

        this.form.patchValue(value);
    }
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');

    readonly submitForm = output<typeof this.form.value>();

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

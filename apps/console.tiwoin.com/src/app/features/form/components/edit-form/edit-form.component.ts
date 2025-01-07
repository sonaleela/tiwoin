import { ChangeDetectionStrategy, Component, inject, Input, output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-edit-form',
    templateUrl: './edit-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EditFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set data(data: any | null) {
        if (!data) return;
        this.form.patchValue(data);
    }

    readonly edit = output();
    readonly copy = output();
    readonly delete = output();
    readonly saveForm = output<typeof this.form.value>();

    form = this.formBuilder.group({
        id: '',
        name: ['', Validators.required],
        isApprovalRequired: false,
        fields: [],
    });

    submit() {
        this.form.markAllAsTouched();

        this.saveForm.emit(this.form.value);
    }
}

import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, inject, output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-add-form',
    templateUrl: './add-form.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AddFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set fields(fields: any | null) {
        if (!fields) return;
        this.form.get('fields')?.setValue(fields);
    }

    readonly edit = output();
    readonly copy = output();
    readonly delete = output();
    readonly saveForm = output<typeof this.form.value>();

    form = this.formBuilder.group({
        name: ['', Validators.required],
        isApprovalRequired: false,
        fields: [],
    });

    constructor(private cdr: ChangeDetectorRef) { }

    submit() {
        this.form.markAllAsTouched();
        this.cdr.markForCheck();
        if (this.form.invalid) return;

        this.saveForm.emit(this.form.value);
    }
}

import { ChangeDetectionStrategy, Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-submit-work-item-form',
    templateUrl: './submit-work-item-form.component.html',
    styles: `:host { @apply block;}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SubmitWorkItemFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set workItem(workItem: any) {
        if (!workItem) return;

        this.form.patchValue({
            workItemId: workItem?.id,
            workItem: workItem,
        });
    }
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');
    readonly submitForm = output<typeof this.form.value>();

    form = this.formBuilder.group({
        createdBy: ['', Validators.required],
        workItemId: ['', Validators.required],
        quantity: [null, Validators.required],
        workItem: [null, Validators.required],
    });

    submit() {
        this.form.get('quantity')?.markAllAsTouched();
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        this.submitForm.emit(this.form.value);
    }
}

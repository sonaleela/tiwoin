import { ChangeDetectionStrategy, Component, inject, Input, OnInit, input, output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { WorkItemModal } from '@models';

@Component({
    selector: 'sonaleela-edit-work-item-form',
    templateUrl: './edit-work-item-form.component.html',
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EditWorkItemFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set workItem(value: any) {
        if (!value) return;

        this.form.patchValue(value);
    }
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');
    readonly submitForm = output<any>();

    form = this.formBuilder.group({
        name: ['', Validators.required],
        description: '',
        workItem: this.formBuilder.group({
            unitPrice: [null, Validators.required],
            deductionCost: [null],
        }),
        isApprovalRequired: false,
    });

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        this.submitForm.emit(this.form.value);
    }
}

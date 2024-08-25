import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { WorkItemModal } from '@models';

@Component({
    selector: 'sonaleela-edit-work-item-form',
    templateUrl: './edit-work-item-form.component.html',
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWorkItemFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set workItem(value: any) {
        if (!value) return;

        this.form.patchValue(value);
    }
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';
    @Output() submitForm = new EventEmitter<any>();

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

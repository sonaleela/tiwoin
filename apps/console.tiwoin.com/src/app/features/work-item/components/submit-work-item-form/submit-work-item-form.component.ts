import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-submit-work-item-form',
    templateUrl: './submit-work-item-form.component.html',
    styles: `:host { @apply block;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitWorkItemFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set workItem(workItem: any) {
        if (!workItem) return;

        this.form.patchValue({
            workItemId: workItem?.id,
            workItem: workItem,
        });
    }
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';
    @Output() submitForm = new EventEmitter();

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

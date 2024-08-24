import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'tiwoin-work-item-form',
    templateUrl: './work-item-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemFormComponent {
    @Input() set workItem(workItem: any) {
        if (!workItem) return;

        this.form.patchValue({
            workItemId: workItem?.id,
            workItem: workItem,
        });
    }
    @Input() isPending: boolean | null = null;

    @Output() submitForm = new EventEmitter();

    private formBuilder: FormBuilder = inject(FormBuilder);
    form = this.formBuilder.group({
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

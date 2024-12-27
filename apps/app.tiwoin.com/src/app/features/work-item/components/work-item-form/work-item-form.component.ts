import { ChangeDetectionStrategy, Component, computed, inject, Input, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'tiwoin-work-item-form',
    templateUrl: './work-item-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WorkItemFormComponent {
    /**
     * Input
     */
    readonly workItem = input<any>();
    readonly isPending = input<boolean | null>(null);

    /**
     * Output
     */
    readonly submitForm = output<any>();

    /**
     * Inject
     */
    private formBuilder: FormBuilder = inject(FormBuilder);

    form = computed(() => {
        const workItem = this.workItem();
        const form = this.formBuilder.group({
            workItemId: ['', Validators.required],
            quantity: [null, Validators.required],
            workItem: [null, Validators.required],
        });
        if (workItem) form.patchValue({
            workItemId: workItem?.id,
            workItem,
        });
        return form;
    });

    submit() {
        this.form().get('quantity')?.markAllAsTouched();
        this.form().markAllAsTouched();
        if (this.form().invalid) return;

        this.submitForm.emit(this.form().value);
    }
}

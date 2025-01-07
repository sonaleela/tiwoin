import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-add-work-item-form',
    templateUrl: './add-work-item-form.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AddWorkItemFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');
    readonly submitForm = output<typeof this.form.value>();

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

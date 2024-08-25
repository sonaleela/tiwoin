import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-add-work-item-form',
    templateUrl: './add-work-item-form.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorkItemFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';
    @Output() submitForm = new EventEmitter();

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

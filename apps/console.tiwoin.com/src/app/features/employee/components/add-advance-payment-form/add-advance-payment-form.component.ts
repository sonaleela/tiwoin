import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-add-advance-payment-form',
    templateUrl: `./add-advance-payment-form.component.html`,
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAdvancePaymentFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;

    @Output() submitForm = new EventEmitter();
    @Output() cancel = new EventEmitter();

    form = this.formBuilder.group({
        amount: [0, Validators.required],
        note: '',
    });

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        this.submitForm.emit(this.form.value);
    }
}

import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-add-advance-payment-form',
    templateUrl: `./add-advance-payment-form.component.html`,
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AddAdvancePaymentFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);

    readonly submitForm = output<typeof this.form.value>();
    readonly cancel = output<boolean>();

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

import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-signin-form',
    templateUrl: './signin-form.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SigninFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');
    readonly submitForm = output<{
    username: string;
}>();

    form = this.formBuilder.group({
        countryCode: ['+91', Validators.required],
        username: ['', Validators.required],
    });

    submit() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            return;
        }
        this.submitForm.emit({ username: `${this.form.value.countryCode}${this.form.value.username}` });
    }
}

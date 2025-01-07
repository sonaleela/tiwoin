import { ChangeDetectionStrategy, Component, inject, Input, OnInit, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-edit-invite-user-form',
    templateUrl: './edit-invite-user-form.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EditInviteUserFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input<null | boolean>(false);
    readonly error = input<null | string>('');
    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set user(user: any) {
        if (!user) return;
        this.form.patchValue({ ...user });
    }
    readonly submitForm = output<typeof this.form.value>();

    form = this.formBuilder.group({
        phoneNumber: [{ value: '', disabled: true }, Validators.required],
        role: ['', Validators.required],
    });

    submit() {
        if (this.form.invalid) return;

        this.submitForm.emit(this.form.value);
    }
}

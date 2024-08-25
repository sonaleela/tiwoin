import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-edit-invite-user-form',
    templateUrl: './edit-invite-user-form.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditInviteUserFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending: null | boolean = false;
    @Input() error: null | string = '';
    @Input() set user(user: any) {
        if (!user) return;
        this.form.patchValue({ ...user });
    }
    @Output() submitForm = new EventEmitter();

    form = this.formBuilder.group({
        phoneNumber: [{ value: '', disabled: true }, Validators.required],
        role: ['', Validators.required],
    });

    submit() {
        if (this.form.invalid) return;

        this.submitForm.emit(this.form.value);
    }
}

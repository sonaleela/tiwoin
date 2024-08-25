import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-edit-form',
    templateUrl: './edit-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set data(data: any | null) {
        if (!data) return;
        this.form.patchValue(data);
    }

    @Output() edit = new EventEmitter();
    @Output() copy = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() saveForm = new EventEmitter();

    form = this.formBuilder.group({
        id: '',
        name: ['', Validators.required],
        isApprovalRequired: false,
        fields: [],
    });

    submit() {
        this.form.markAllAsTouched();

        this.saveForm.emit(this.form.value);
    }
}

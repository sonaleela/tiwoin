import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef, inject, } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-add-form',
    templateUrl: './add-form.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set fields(fields: any | null) {
        if (!fields) return;
        this.form.get('fields')?.setValue(fields);
    }

    @Output() edit = new EventEmitter();
    @Output() copy = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() saveForm = new EventEmitter();

    form = this.formBuilder.group({
        name: ['', Validators.required],
        isApprovalRequired: false,
        fields: [],
    });

    constructor(private cdr: ChangeDetectorRef) { }

    submit() {
        this.form.markAllAsTouched();
        this.cdr.markForCheck();
        if (this.form.invalid) return;

        this.saveForm.emit(this.form.value);
    }
}

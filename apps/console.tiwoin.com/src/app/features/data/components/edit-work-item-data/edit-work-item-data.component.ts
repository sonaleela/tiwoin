import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-edit-work-item-data',
    templateUrl: './edit-work-item-data.component.html',
    styles: [`:host { @apply flex flex-col py-6 gap-6 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWorkItemDataComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    private _data: any;
    @Input() set data(data: any) {
        if (!data) return;
        this._data = data;
        this.form.patchValue({
            ...data,
        });
    }
    get data() { return this._data; }

    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() editWorkItem: EventEmitter<any> = new EventEmitter();

    form = this.formBuilder.group({
        id: ['', Validators.required],
        employee: [{ value: '', disabled: true }, Validators.required],
        quantity: ['', Validators.required],
    });

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        this.editWorkItem.emit(this.form.value);
    }

    reset() {
        console.log('reset', this.data);
        this.form.patchValue({ ...this.data });
    }
}

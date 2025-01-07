import { ChangeDetectionStrategy, Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-edit-work-item-data',
    templateUrl: './edit-work-item-data.component.html',
    styles: [`:host { @apply flex flex-col py-6 gap-6 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EditWorkItemDataComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    private _data: any;
    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set data(data: any) {
        if (!data) return;
        this._data = data;
        this.form.patchValue({
            ...data,
        });
    }
    get data() { return this._data; }

    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(null);
    readonly close = output<boolean>();
    readonly editWorkItem = output<typeof this.form.value>();

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

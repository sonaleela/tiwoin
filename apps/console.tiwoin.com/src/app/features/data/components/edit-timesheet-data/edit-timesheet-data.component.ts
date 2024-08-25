import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { timesheetTimeValidator } from '../../validator';
import dayjs from 'dayjs';

@Component({
    selector: 'sonaleela-edit-timesheet-data',
    templateUrl: './edit-timesheet-data.component.html',
    styles: [`:host { @apply flex flex-col py-6 gap-6 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTimesheetDataComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set data(data: any) {
        if (!data) return;
        const entries = data.entries.map((entry: any) => {
            this.addEntry();
            return { time: dayjs(entry.time).format('HH:mm'), type: entry.type };
        });
        this.removeEntry();

        this.form.patchValue({
            ...data,
            date: dayjs(data.date).format('YYYY-MM-DD'),
            entries,
        });
    }
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() addTimesheet: EventEmitter<any> = new EventEmitter();

    form = this.formBuilder.group({
        id: ['', Validators.required],
        employee: [{ value: '', disabled: true }, Validators.required],
        date: [{ value: '', disabled: true }, Validators.required],
        entries: this.formBuilder.array([this.formBuilder.group({
            time: ['', Validators.required],
            type: [{ value: 'In', disabled: true }],
        })], { validators: [timesheetTimeValidator()] }),
    });

    get entries() {
        return this.form.get('entries') as FormArray;
    }

    addEntry() {
        this.entries.push(this.formBuilder.group({
            time: ['', Validators.required],
            type: [{ value: this.entries.length % 2 === 0 ? 'In' : 'Break', disabled: this.entries.length % 2 === 0 ? true : false }],
        }));
    }

    removeEntry() {
        this.entries.removeAt(this.entries.length - 1);
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        if (this.entries!.length < 2) return;

        if (this.entries!.length % 2 === 1 || this.entries.at(this.entries.length - 1)?.value?.type !== 'Out') {
            this.entries.setErrors({ outEntryMissing: true });
            return;
        }
        if (this.entries!.length % 2 === 0
            && this.entries.value.some((entry: { type: string, time: any }, index: number) => entry.type === 'Out' && (index !== (this.entries.length - 1)))) {
            this.entries.setErrors({ misplacedOutEntry: true });
            return;
        }

        const entries = this.form.getRawValue().entries
            ?.filter((t => !!t.time))
            .map(entry => {
                const hour = +entry.time!.split(':')[0];
                const minute = +entry.time!.split(':')[1];
                return {
                    time: dayjs(this.form.value.date).hour(hour).minute(minute).toISOString(),
                    type: entry.type,
                };
            });

        this.addTimesheet.emit({
            id: this.form.value.id,
            entries,
            entry: entries![entries!.length - 1],
        });
    }
}

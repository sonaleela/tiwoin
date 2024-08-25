import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import dayjs from 'dayjs';

import { timesheetTimeValidator } from '../../validator';

@Component({
    selector: 'sonaleela-add-timesheet-data',
    templateUrl: './add-timesheet-data.component.html',
    styles: [`:host { @apply flex flex-col py-6 gap-6 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTimesheetDataComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() addTimesheet: EventEmitter<any> = new EventEmitter();

    form = this.formBuilder.group({
        employee: ['', Validators.required],
        date: ['', Validators.required],
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
                }
            });
        this.addTimesheet.emit({
            date: dayjs(this.form.value.date).toISOString(),
            employeeId: (<any>this.form.value.employee)?.id,
            entries,
            entry: entries![entries!.length - 1],
        });
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import dayjs from "dayjs";

@Component({
    selector: 'sonaleela-timesheet-date-selector',
    templateUrl: `timesheet-date-selector.component.html`,
    styles: [`:host { @apply flex items-center justify-between w-full bg-gray-75 py-2 px-1 rounded;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetDateSelectorComponent {
    @Input() date: string | null = dayjs().format('YYYY-MM-DD');

    @Output() dateSelect = new EventEmitter();
    today = dayjs().format('YYYY-MM-DD');

    next() {
        const nextDate = this.date
            ? dayjs(this.date, 'YYYY-MM-DD').add(1, 'day')
            : dayjs().add(1, 'day');
        this.dateSelect.emit(nextDate.format('YYYY-MM-DD'));
    }

    previous() {
        const previousDate = this.date
            ? dayjs(this.date, 'YYYY-MM-DD').subtract(1, 'day')
            : dayjs().subtract(1, 'day');
        this.dateSelect.emit(previousDate.format('YYYY-MM-DD'));
    }

    dateChange(event: any) {
        this.dateSelect.emit(event?.target?.value);
    }
}

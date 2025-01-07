import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, input, output } from '@angular/core';
import dayjs from "dayjs";

@Component({
    selector: 'sonaleela-payroll-date-selector',
    templateUrl: `./payroll-date-selector.component.html`,
    styles: [`:host { @apply flex items-center justify-between w-full bg-gray-75 py-2 px-1 rounded; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PayrollDateSelectorComponent implements OnChanges {
    readonly date = input<string | null>(dayjs().format('YYYY-MM-DD'));

    readonly dateSelect = output<any>();
    today = new Date();

    next() {
        const date = this.date();
        const nextDate = date
            ? dayjs(date, 'YYYY-MM-DD').add(1, 'day')
            : dayjs().add(1, 'day');
        this.dateSelect.emit(nextDate.format('YYYY-MM-DD'));
    }

    previous() {
        const date = this.date();
        const previousDate = date
            ? dayjs(date, 'YYYY-MM-DD').subtract(1, 'day')
            : dayjs().subtract(1, 'day');
        this.dateSelect.emit(previousDate.format('YYYY-MM-DD'));
    }

    ngOnChanges(changes: SimpleChanges): void {
    }
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import { CommonModule } from '@angular/common';
import dayjs from "dayjs";

@Component({
    selector: 'tiwoin-date-filter-bar',
    imports: [CommonModule, SluiButtonModule, SluiIconModule],
    templateUrl: './date-filter-bar.component.html',
    styles: [`:host { @apply flex items-center justify-between w-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DateFilterBarComponent {
    /**
     * Input
     */
    readonly date = input<string | null>(dayjs().format('YYYY-MM-DD'));

    /**
     * Output
     */
    readonly dateSelect = output<string>();

    today = dayjs().format('YYYY-MM-DD');

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

    dateChange(event: any) {
        this.dateSelect.emit(event?.target?.value);
    }
}

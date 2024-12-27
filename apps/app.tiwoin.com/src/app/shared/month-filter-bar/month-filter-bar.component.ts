import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import dayjs from "dayjs";

@Component({
    selector: 'tiwoin-month-filter-bar',
    imports: [CommonModule, SluiButtonModule, SluiIconModule],
    templateUrl: `./month-filter-bar.component.html`,
    styles: [`:host { @apply flex items-center justify-between w-full; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class MonthFilterBarComponent {
    readonly date = input<string | null>(dayjs().format('YYYY-MM-DD'));

    @Output() dateSelect = new EventEmitter();
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
}

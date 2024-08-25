import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterList } from '@models';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

@Component({
    selector: 'sonaleela-filter',
    templateUrl: './filter.component.html',
    styles: [`:host {@apply flex flex-col gap-3;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
    @Input() filterObject: FilterList | null = null;

    @Output() filter = new EventEmitter();
    @Output() clear = new EventEmitter();

    isFilter: boolean = false;

    dateFilter(time: string) {
        switch (time) {
            case 'today': this.filter.emit({
                ...this.filterObject,
                startDate: dayjs().startOf('day').toDate(),
                endDate: dayjs().toDate(),
            });
                break;
            case 'yesterday': {
                this.filter.emit({
                    ...this.filterObject,
                    startDate: dayjs().subtract(1, 'day').startOf('day').toDate(),
                    endDate: dayjs().subtract(1, 'day').endOf('day').toDate(),
                });
                break;
            }
            case 'this week': this.filter.emit({
                ...this.filterObject,
                startDate: dayjs().startOf('week'),
                endDate: new Date(),
            });
                break;
            case 'this month': this.filter.emit({
                ...this.filterObject,
                startDate: dayjs().startOf('month'),
                endDate: new Date(),
            });
                break;
        }
        this.isFilter = !this.isFilter;
    }
}

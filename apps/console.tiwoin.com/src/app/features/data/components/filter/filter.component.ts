import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FilterList } from '@models';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

@Component({
    selector: 'sonaleela-filter',
    templateUrl: './filter.component.html',
    styles: [`:host {@apply flex flex-col gap-3;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FilterComponent {
    readonly filterObject = input<FilterList | null>(null);

    readonly filter = output<any>();
    readonly clear = output<boolean>();

    isFilter: boolean = false;

    dateFilter(time: string) {
        switch (time) {
            case 'today': this.filter.emit({
                ...this.filterObject(),
                startDate: dayjs().startOf('day').toDate(),
                endDate: dayjs().toDate(),
            });
                break;
            case 'yesterday': {
                this.filter.emit({
                    ...this.filterObject(),
                    startDate: dayjs().subtract(1, 'day').startOf('day').toDate(),
                    endDate: dayjs().subtract(1, 'day').endOf('day').toDate(),
                });
                break;
            }
            case 'this week': this.filter.emit({
                ...this.filterObject(),
                startDate: dayjs().startOf('week'),
                endDate: new Date(),
            });
                break;
            case 'this month': this.filter.emit({
                ...this.filterObject(),
                startDate: dayjs().startOf('month'),
                endDate: new Date(),
            });
                break;
        }
        this.isFilter = !this.isFilter;
    }
}

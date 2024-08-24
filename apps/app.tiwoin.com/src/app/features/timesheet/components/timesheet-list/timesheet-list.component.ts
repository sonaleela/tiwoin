import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration)

@Component({
    selector: 'tiwoin-timesheet-list',
    templateUrl: './timesheet-list.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class TimesheetListComponent {
    private _list: any[] = [];
    @Input() set list(list: any[]) {
        if (!list) return;
        this._list = [...this.normalizeData(list)];
    }
    get list(): any[] { return this._list; }

    @Input() error: string | null = '';
    @Input() isPending: boolean | null = null;

    expandElement: any;
    displayedColumns = ['date', 'time', 'totalTime'];

    normalizeData(list: { entries: any[], date: string, totalTime: any }[]) {
        return list.map(timesheet => {
            // Create duration to get hours and minutes, given time is in ms
            const duration = dayjs.duration(timesheet?.totalTime);
            const totalTime = `${duration.hours()}:${duration.minutes()}`;
            return {
                ...timesheet,
                totalTime,
            }
        })
    }
}

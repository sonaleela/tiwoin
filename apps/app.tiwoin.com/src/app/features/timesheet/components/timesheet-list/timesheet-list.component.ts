import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration)


function normalizeData(list: any[] | { entries: any[], date: string, totalTime: any }[] | null | undefined): any[] {
    if (!list) return [];
    return list.map(timesheet => {
        // Create duration to get hours and minutes, given time is in ms
        const duration = dayjs.duration(timesheet?.totalTime);
        const totalTime = `${duration.hours()}:${duration.minutes()}`;
        return {
            ...timesheet,
            totalTime,
        }
    });
}

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
    standalone: false
})
export class TimesheetListComponent {
    /**
     * Input
     */
    readonly list = input([], { transform: normalizeData });
    readonly error = input<string | null>('');
    readonly isPending = input<boolean | null>(null);

    expandElement: any;
    displayedColumns = ['date', 'time', 'totalTime'];
}

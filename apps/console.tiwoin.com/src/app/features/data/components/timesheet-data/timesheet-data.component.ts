import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration)

@Component({
    selector: 'sonaleela-timesheet-data',
    templateUrl: `./timesheet-data.component.html`,
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
export class TimesheetDataComponent {
    private _attendanceData: any[] = [];
    @Input() set attendanceData(attendanceData: any[]) {
        if (!attendanceData) return;
        this._attendanceData = attendanceData.map(attendance => {
            const duration = dayjs.duration(attendance?.totalTime);
            const totalTime = `${duration.hours()}:${duration.minutes()}`;
            return { ...attendance, totalTime };
        });
    }
    get attendanceData() { return this._attendanceData; }

    @Input() error: string | null = '';
    @Input() isPending: boolean | null = false;
    @Input() timeFormat: string = '';

    @Output() selectGeoLocationData: EventEmitter<any> = new EventEmitter();
    @Output() sortBy: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['expand', 'employee', 'timeline', 'totalTime', 'edit'];
    expandElement: any;

    sortDataBy(data: any) {
        this.sortBy.emit(data);
    }
}

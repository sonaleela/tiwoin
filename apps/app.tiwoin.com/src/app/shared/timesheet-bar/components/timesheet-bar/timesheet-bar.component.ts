import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import dayjs from "dayjs";

@Component({
    selector: 'tiwoin-timesheet-bar',
    templateUrl: './timesheet-bar.component.html',
    styles: [`:host {display: block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetBarComponent {
    @Input() set entries(entries: { type: string, time: string }[]) {
        if (!entries) return;

        this.timeline = [...this.normalizeData(entries)];
    }

    timeline: { length: number, type: string }[] = [];
    constructor() { }

    normalizeData(entries: { type: string, time: string }[]): { length: number, type: string }[] {
        const timeline: { length: number, type: string }[] = []
        const start = dayjs(new Date(entries![0].time)).startOf('day');

        entries.forEach((entry, index) => {
            const diff = index === 0
                ? dayjs(start).diff(new Date(entry.time), 'minute')
                : dayjs(entries[index - 1].time).diff(new Date(entry.time), 'minute')
            const type = index === 0
                ? 'OUT'
                : entries[index - 1]?.type;
            timeline.push({
                length: (diff * 100) / (24 * 60),
                type: type
            })
        });
        return timeline;
    }
}

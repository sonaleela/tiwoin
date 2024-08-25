import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

@Component({
    selector: 'sonaleela-timesheet-timeline',
    templateUrl: './timesheet-timeline.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetTimelineComponent {
    private _entires: any[] = [];
    @Input() set entries(entries: any[]) {
        if (!entries.length) return;

        this._entires = this.calculateTimeEntries(entries);
    }
    get entries() {
        return this._entires;
    }

    calculateTimeEntries(entries: any[]) {
        return entries.map((entry, index) => {
            const entryTime = new Date(entry.time);
            const startTimePercent = this.calculateStartTimePercent(entryTime);
            let durationPercent;

            // If  Calculate duration by subtracting time from next entry
            // else if last entry is IN then subtract from end of the day
            // if last entry is OUT then it'll be ignored
            if (index < entries.length - 1) {
                const nextEntryTime = new Date(entries[index + 1].time);
                const duration = nextEntryTime.valueOf() - entryTime.valueOf();
                durationPercent = (duration / (1000 * 60)) / (24 * 60) * 100;
                durationPercent = durationPercent + '%';
            } else if (entry.type === 'In' || entry.type === 'Break') {
                const endOfDay: any = dayjs(entry.time).isToday() ? new Date() : new Date(entry.time).setHours(23, 59, 59, 999);
                const duration = endOfDay.valueOf() - entryTime.valueOf();
                durationPercent = (duration / (1000 * 60)) / (24 * 60) * 100;
                durationPercent = durationPercent + '%';
            }
            return { ...entry, startTimePercent, durationPercent };
        });
    }

    /**
     * Calculate percentage position of time on the timeline
     * We calculate it wrt to 24Hrs of the day, eg. 8AM would be 33.33%(8*60*100/(24*60))
     * 
     * @param time 
     * @returns 
     */
    calculateStartTimePercent(time: Date) {
        return ((time.getHours() * 60 + time.getMinutes()) / (24 * 60)) * 100 + '%';
    }
}

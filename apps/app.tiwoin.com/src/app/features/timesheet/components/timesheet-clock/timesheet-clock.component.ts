import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

interface Entry {
    name: string,
    type: string,
    time?: string,
}

@Component({
    selector: 'tiwoin-timesheet-clock',
    templateUrl: './timesheet-clock.component.html',
    styles: [`:host {@apply flex flex-col h-full bg-gray-75;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TimesheetClockComponent {
    /**
     * Input
     */
    readonly entryTypes = input<Entry[] | null>([]);
    readonly clockEntry = input<{ entries: Entry[] } | null>(null);
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>(null);
    readonly isClockEntryPending = input<boolean | null>(false);

    /**
     * Output
     */
    readonly timeEntry = output<Entry>();
}

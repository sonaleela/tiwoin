import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'tiwoin-timesheet-clock',
    templateUrl: './timesheet-clock.component.html',
    styles: [`:host {@apply flex flex-col h-full bg-gray-75;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TimesheetClockComponent {
    readonly entryTypes = input<{
    name: string;
    type: string;
}[] | null>([]);
    readonly clockEntry = input<{
    entries: {
        name: string;
        type: string;
        time: string;
    }[];
} | null>(null);
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>(null);
    readonly isClockEntryPending = input<boolean | null>(false);

    @Output() timeEntry = new EventEmitter<{ name: string, type: string }>();
}

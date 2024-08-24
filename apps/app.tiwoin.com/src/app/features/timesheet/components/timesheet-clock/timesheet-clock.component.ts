import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'tiwoin-timesheet-clock',
    templateUrl: './timesheet-clock.component.html',
    styles: [`:host {@apply flex flex-col h-full bg-gray-75;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetClockComponent {
    @Input() entryTypes: { name: string, type: string }[] | null = [];
    @Input() clockEntry: { entries: { name: string, type: string, time: string }[] } | null = null;
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = null;
    @Input() isClockEntryPending: boolean | null = false;

    @Output() timeEntry = new EventEmitter<{ name: string, type: string }>();
}

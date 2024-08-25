import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'sonaleela-timesheet-data-header',
    templateUrl: './timesheet-data-header.component.html',
    styles: [`:host { @apply flex items-center gap-3 py-4; }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetDataHeaderComponent {}

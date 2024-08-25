import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-timesheet-data-page',
    template: `<sonaleela-timesheet-data-controller></sonaleela-timesheet-data-controller>`,
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetDataPageComponent { }

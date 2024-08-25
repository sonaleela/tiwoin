import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-add-timesheet-data-page',
    template: `<sonaleela-add-timesheet-data-controller></sonaleela-add-timesheet-data-controller>`,
    styles: `:host { @apply block;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTimesheetDataPageComponent { }

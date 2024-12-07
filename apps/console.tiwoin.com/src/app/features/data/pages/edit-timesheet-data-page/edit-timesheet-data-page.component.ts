import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-edit-timesheet-data-page',
    template: `<sonaleela-edit-timesheet-data-controller></sonaleela-edit-timesheet-data-controller>`,
    styles: `:host { @apply block;}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EditTimesheetDataPageComponent { }

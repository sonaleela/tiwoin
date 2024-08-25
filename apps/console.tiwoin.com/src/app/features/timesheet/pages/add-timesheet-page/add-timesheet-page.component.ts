import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-add-timesheet-page',
  template: '<sonaleela-add-timesheet-controller></sonaleela-add-timesheet-controller>',
  styles: [`:host { @apply block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTimesheetPageComponent { }

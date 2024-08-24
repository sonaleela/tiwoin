import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-timesheet-list-page',
  template: `<tiwoin-timesheet-list-controller></tiwoin-timesheet-list-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetListPageComponent {}

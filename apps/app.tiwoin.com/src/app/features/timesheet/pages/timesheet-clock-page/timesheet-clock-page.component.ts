import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-timesheet-clock-page',
  template: '<tiwoin-timesheet-clock-controller></tiwoin-timesheet-clock-controller>',
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetClockPageComponent { }

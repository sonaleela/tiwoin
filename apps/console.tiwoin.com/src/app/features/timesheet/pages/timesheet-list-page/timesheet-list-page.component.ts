import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-timesheet-list-page',
  template: '<sonaleela-timesheet-list-controller></sonaleela-timesheet-list-controller>',
  styles: [`:host { @apply block; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetListPageComponent { }

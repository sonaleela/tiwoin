import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-timesheet-list-header',
  templateUrl: './timesheet-list-header.component.html',
  styles: [`:host { @apply flex items-center gap-3 py-4;}`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetListHeaderComponent { }

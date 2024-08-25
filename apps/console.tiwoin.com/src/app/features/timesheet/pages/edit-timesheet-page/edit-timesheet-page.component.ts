import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-edit-timesheet-page',
  template: '<sonaleela-edit-timesheet-controller></sonaleela-edit-timesheet-controller>',
  styles: [':host { @apply block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTimesheetPageComponent { }

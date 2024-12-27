import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'tiwoin-timesheet-list-header',
    templateUrl: './timesheet-list-header.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TimesheetListHeaderComponent { }

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-employee-list-header',
    templateUrl: './employee-list-header.component.html',
    styles: [':host {@apply flex items-center gap-3 py-4; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListHeaderComponent { }

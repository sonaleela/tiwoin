import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-employee-header',
    templateUrl: './employee-header.component.html',
    styles: [':host {@apply flex flex-row items-center gap-4;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeHeaderComponent {
    @Input() employee?: EmployeeModel | null;
}

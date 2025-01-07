import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-employee-list',
    templateUrl: './employee-list.component.html',
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EmployeeListComponent {
    readonly employeeList = input<EmployeeModel[]>([]);
    displayedColumns = ['avatar', 'name', 'phoneNumber', 'position', 'department', 'contact', 'status', 'actions'];

    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>(null);
    readonly delete = output<string>();
}

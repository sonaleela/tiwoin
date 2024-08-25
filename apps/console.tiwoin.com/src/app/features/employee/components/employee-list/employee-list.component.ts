import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-employee-list',
    templateUrl: './employee-list.component.html',
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
    @Input() employeeList: EmployeeModel[] = [];
    displayedColumns = ['avatar', 'name', 'phoneNumber', 'position', 'department', 'contact', 'status', 'actions'];

    @Input() isPending: boolean | null = false;
    @Input() error: string | null = null;
    @Output() delete = new EventEmitter<string>();
}

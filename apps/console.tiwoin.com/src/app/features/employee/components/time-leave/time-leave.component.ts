import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-time-leave',
    templateUrl: './time-leave.component.html',
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeLeaveComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() employee?: EmployeeModel | null;
    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;

    @Output() editEmployee = new EventEmitter();

    isTimesheetForm = false;
    timesheetForm = this.formBuilder.group({
        clockTime: this.formBuilder.group({
            inTime: '',
            outTime: '',
            breakTime: 0,
        }),
        minimumWorkHours: this.formBuilder.group({
            fullDay: 0,
            halfDay: 0,
        }),
    });

    isLeaveForm = false;
    leaveForm = this.formBuilder.group({
        leaves: this.formBuilder.group({
            paidLeaves: 0,
            earnedPaidLeaves: 0,
            consumedLeaves: 0,
        }),
    });

    editTimesheetInfo() {
        this.isTimesheetForm = true;
        this.timesheetForm.patchValue(this.employee || {});
    }
    submitTimesheet() {
        if (this.timesheetForm.invalid) return;

        this.editEmployee.emit(this.timesheetForm.value);
    }

    editLeaveInfo() {
        this.isLeaveForm = true;
        this.leaveForm.patchValue(this.employee || {});
    }
    submitLeave() {
        if (this.leaveForm.invalid) return;

        this.editEmployee.emit(this.leaveForm.value);
    }
}

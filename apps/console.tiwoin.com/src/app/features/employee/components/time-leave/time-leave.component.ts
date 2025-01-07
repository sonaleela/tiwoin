import { Component, ChangeDetectionStrategy, inject, input, output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-time-leave',
    templateUrl: './time-leave.component.html',
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TimeLeaveComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly employee = input<EmployeeModel | null>();
    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);

    readonly editEmployee = output<any>();

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
        this.timesheetForm.patchValue(this.employee() || {});
    }
    submitTimesheet() {
        if (this.timesheetForm.invalid) return;

        this.editEmployee.emit(this.timesheetForm.value);
    }

    editLeaveInfo() {
        this.isLeaveForm = true;
        this.leaveForm.patchValue(this.employee() || {});
    }
    submitLeave() {
        if (this.leaveForm.invalid) return;

        this.editEmployee.emit(this.leaveForm.value);
    }
}

import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-company-profile',
    templateUrl: './company-profile.component.html',
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyProfileComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() employee?: EmployeeModel | null;
    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;

    @Output() editEmployee = new EventEmitter();

    isPositionForm = false;
    positionForm = this.formBuilder.group({
        position: '',
        joiningDate: '',
        sites: '',
        reportTo: '',
        department: '',
    });

    isPFForm = false;
    PFForm = this.formBuilder.group({
        PFNumber: '',
        ESINumber: '',
    });

    isNoticeForm = false;
    noticeForm = this.formBuilder.group({
        noticePeriod: ''
    });

    editPositionInfo() {
        this.isPositionForm = true;
        this.positionForm.patchValue(this.employee || {});
    }
    submitPosition() {
        if (this.positionForm.invalid) return;

        this.editEmployee.emit(this.positionForm.value);
    }

    editPFInfo() {
        this.isPFForm = true;
        this.PFForm.patchValue(this.employee || {});
    }
    submitPF() {
        if (this.PFForm.invalid) return;

        this.editEmployee.emit(this.PFForm.value);
    }

    editNoticeInfo() {
        this.isNoticeForm = true;
        this.noticeForm.patchValue(this.employee || {});
    }
    submitNotice() {
        if (this.noticeForm.invalid) return;

        this.editEmployee.emit(this.noticeForm.value);
    }
}

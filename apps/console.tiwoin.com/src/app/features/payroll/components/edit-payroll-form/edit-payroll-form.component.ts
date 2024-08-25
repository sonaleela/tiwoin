import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PayrollComponentModel, PayrollModel } from '@models';

interface PayrollForm {
    name: FormControl<string>,
    description: FormControl<string>,
    baseDayType: FormControl<string>,
    fixedDay: FormControl<number>,
    earning: FormControl<any[]>,
    deduction: FormControl<any[]>,
    // perquisites: FormControl<string>,
};

@Component({
    selector: 'sonaleela-edit-payroll-form',
    templateUrl: './edit-payroll-form.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPayrollFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set payroll(payroll: PayrollModel | null) {
        if (!payroll) return;

        this.form.patchValue(payroll);
        this.selectedComponent = [...payroll?.earning, ...payroll?.deduction];
    }
    @Input() set selectedComponent(components: PayrollComponentModel[] | null) {
        if (!components) return;

        this.earnings = [];
        this.deductions = [];
        components?.forEach(component => {
            if (component.type === 'DEDUCTION') {
                this.deductions.push(component);
                this.form.controls.deduction.setValue(this.deductions);
            } else if (component.type === 'EARNING') {
                this.earnings.push(component);
                this.form.controls.earning.setValue(this.earnings);
            }
        });
    }


    @Output() unSelectComponentId = new EventEmitter<any>();
    @Output() submitForm = new EventEmitter<any>();

    earnings: PayrollComponentModel[] = [];
    deductions: PayrollComponentModel[] = [];

    form = this.formBuilder.group<PayrollForm>({
        name: this.formBuilder.nonNullable.control('', Validators.required),
        description: this.formBuilder.nonNullable.control(''),
        baseDayType: this.formBuilder.nonNullable.control('CALENDAR', Validators.required),
        fixedDay: this.formBuilder.nonNullable.control({ value: 30, disabled: true }),
        earning: this.formBuilder.nonNullable.control([]),
        deduction: this.formBuilder.nonNullable.control([]),
        // perquisites: this.formBuilder.nonNullable.control(''),
    });

    constructor() {
        this.form.get('baseDayType')?.valueChanges.subscribe(baseType => {
            if (baseType === 'FIXED') {
                this.form.get('fixedDay')?.enable();
            } else {
                this.form.get('fixedDay')?.disable();
            }
        })
    }

    submit() {
        if (!this.form.valid) return;

        this.submitForm.emit(this.form.value);
    }
}

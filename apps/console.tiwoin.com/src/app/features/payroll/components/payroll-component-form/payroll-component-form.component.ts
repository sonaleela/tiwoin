import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

interface PayrollComponentForm {
    name: FormControl<string>,
    description: FormControl<string>,
    type: FormControl<string>,
    calculationtype: FormControl<string>,
    percentageOf: FormControl<string>,
    percentage: FormControl<number>,
    minimumAmount: FormControl<number>,
    maximumAmount: FormControl<number>,
    fixedAmount: FormControl<number>,
    isTaxable: FormControl<boolean>
}

const initialPayrollComponentValue = {
    percentageOf: '',
    percentage: 0,
    minimumAmount: 0,
    maximumAmount: 0,
    fixedAmount: 0,
}

@Component({
    selector: 'sonaleela-payroll-component-form',
    templateUrl: './payroll-component-form.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrollComponentFormComponent implements OnDestroy {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';

    @Output() submitForm = new EventEmitter();
    @Output() close = new EventEmitter();

    form = this.formBuilder.group<PayrollComponentForm>({
        name: this.formBuilder.nonNullable.control('', Validators.required),
        description: this.formBuilder.nonNullable.control(''),
        type: this.formBuilder.nonNullable.control('EARNING', Validators.required),
        calculationtype: this.formBuilder.nonNullable.control('FIXED', Validators.required),
        percentageOf: this.formBuilder.nonNullable.control('BASIC', Validators.required),
        percentage: this.formBuilder.nonNullable.control(0, Validators.required),
        minimumAmount: this.formBuilder.nonNullable.control(0),
        maximumAmount: this.formBuilder.nonNullable.control(0),
        fixedAmount: this.formBuilder.nonNullable.control(0, Validators.required),
        isTaxable: this.formBuilder.nonNullable.control(false),
    });

    subscriptions: Subscription[] = [];
    constructor() {
        const sub = this.form?.controls.calculationtype.valueChanges.subscribe(value => {
            if (value === 'FIXED') {
                this.form.controls.percentageOf.disable();
                this.form.controls.percentage.disable();
                this.form.controls.minimumAmount.disable();
                this.form.controls.maximumAmount.disable();
                this.form.controls.fixedAmount.enable();
            }
            if (value === 'PERCENTAGE') {
                this.form.controls.percentageOf.enable();
                this.form.controls.percentage.enable();
                this.form.controls.minimumAmount.disable();
                this.form.controls.maximumAmount.disable();
                this.form.controls.fixedAmount.disable();
            }
            if (value === 'VARIABLE') {
                this.form.controls.percentageOf.disable();
                this.form.controls.percentage.disable();
                this.form.controls.minimumAmount.enable();
                this.form.controls.maximumAmount.enable();
                this.form.controls.fixedAmount.disable();
            }
        });
        this.subscriptions.push(sub);
    }

    submit() {
        this.form.markAllAsTouched();
        if (this.form.invalid) return;

        const body = { ...initialPayrollComponentValue, ...this.form.value };
        this.submitForm.emit(body);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub?.unsubscribe());
    }
}

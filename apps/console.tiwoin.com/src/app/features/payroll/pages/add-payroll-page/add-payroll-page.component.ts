import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-add-payroll-page',
    template: '<sonaleela-add-payroll-controller></sonaleela-add-payroll-controller>',
    styles: [`:host { @apply block h-full; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPayrollPageComponent { }

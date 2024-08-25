import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-payroll-data-page',
    template: `<sonaleela-payroll-data-controller></sonaleela-payroll-data-controller>`,
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollDataPageComponent { }

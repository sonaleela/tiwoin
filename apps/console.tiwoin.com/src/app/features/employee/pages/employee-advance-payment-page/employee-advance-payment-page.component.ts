import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-employee-advance-payment-page',
    template: `<sonaleela-advance-payment-controller></sonaleela-advance-payment-controller>`,
    styles: `:host {@apply block h-full;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeAdvancePaymentPageComponent { }

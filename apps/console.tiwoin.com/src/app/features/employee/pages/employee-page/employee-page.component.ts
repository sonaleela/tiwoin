import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-employee-page',
    template: `<sonaleela-employee-controller></sonaleela-employee-controller>`,
    styles: `:host { @apply block h-full;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePageComponent { }

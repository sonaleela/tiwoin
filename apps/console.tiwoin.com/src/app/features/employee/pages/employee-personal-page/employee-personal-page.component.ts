import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-employee-personal-page',
    template: `<sonaleela-personal-profile-controller></sonaleela-personal-profile-controller>`,
    styles: [`:host {@apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePersonalPageComponent { }

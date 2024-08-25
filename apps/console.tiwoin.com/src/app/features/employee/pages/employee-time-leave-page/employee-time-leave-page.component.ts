import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-employee-time-leave-page',
    template: ` <sonaleela-time-leave-controller></sonaleela-time-leave-controller> `,
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeTimeLeavePageComponent {}

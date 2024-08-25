import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-employee-company-page',
    template: ` <sonaleela-company-profile-controller></sonaleela-company-profile-controller> `,
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCompanyPageComponent {}

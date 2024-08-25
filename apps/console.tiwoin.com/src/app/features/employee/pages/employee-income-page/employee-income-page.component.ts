import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-employee-income-page',
    template: ` <sonaleela-income-controller></sonaleela-income-controller> `,
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeIncomePageComponent {}

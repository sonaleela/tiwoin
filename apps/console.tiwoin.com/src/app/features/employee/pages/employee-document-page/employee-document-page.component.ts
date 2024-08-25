import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-employee-document-page',
    template: ` <sonaleela-document-controller></sonaleela-document-controller> `,
    styles: [
        `
            :host {
                display: block;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDocumentPageComponent {}

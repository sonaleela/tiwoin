import { Component } from '@angular/core';

@Component({
    selector: 'sonaleela-employee-list-page',
    template: `<sonaleela-employee-list-controller></sonaleela-employee-list-controller>`,
    styles: [':host { @apply block h-full; }'],
})
export class EmployeeListPageComponent { }

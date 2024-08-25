import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-form-list-page',
    template: `<sonaleela-form-list-controller></sonaleela-form-list-controller>`,
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormListPageComponent { }

import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
    selector: 'sonaleela-form-data-page',
    template: '<sonaleela-form-data-controller></sonaleela-form-data-controller>',
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDataPageComponent { }

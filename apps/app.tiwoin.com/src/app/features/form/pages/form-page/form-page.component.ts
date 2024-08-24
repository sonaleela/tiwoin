import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'tiwoin-form-page',
    template: '<tiwoin-form-controller></tiwoin-form-controller>',
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPageComponent { }

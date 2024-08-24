import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'tiwoin-form-view-page',
    template: '<tiwoin-form-view-controller></tiwoin-form-view-controller>',
    styles: `:host { @apply block h-full; }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormViewPageComponent { }

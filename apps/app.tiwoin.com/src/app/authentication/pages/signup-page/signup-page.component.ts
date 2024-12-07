import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'tiwoin-signup-page',
    template: '<tiwoin-signup-controller></tiwoin-signup-controller>',
    styles: [`:host { @apply block h-full; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SignupPageComponent { }

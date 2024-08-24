import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'tiwoin-empty-organization-controller',
    template: `<tiwoin-empty-organization></tiwoin-empty-organization>`,
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyOrganizationControllerComponent { }

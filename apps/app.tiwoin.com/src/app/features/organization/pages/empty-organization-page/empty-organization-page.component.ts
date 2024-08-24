import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'tiwoin-empty-organization-page',
    template: `<tiwoin-empty-organization-controller></tiwoin-empty-organization-controller>`,
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyOrganizationPageComponent { }

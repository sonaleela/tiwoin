import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-organization-list-page',
    template: `<sonaleela-organization-list-controller></sonaleela-organization-list-controller>`,
    styles: [`:host { @apply block h-full; }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListPageComponent { }

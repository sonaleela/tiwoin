import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'tiwoin-organization-list-page',
	template: `<tiwoin-organization-list-controller></tiwoin-organization-list-controller>`,
	styles: [`:host {@apply block h-full;}`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListPageComponent { }

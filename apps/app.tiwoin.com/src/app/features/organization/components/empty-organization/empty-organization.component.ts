import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'tiwoin-empty-organization',
    templateUrl: `./empty-organization.component.html`,
    styles: [`:host { @apply flex flex-col items-center justify-center h-full px-6 pt-0 pb-12;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyOrganizationComponent { }

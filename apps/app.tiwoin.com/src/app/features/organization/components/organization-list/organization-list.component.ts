import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProfileModel } from '@models';

@Component({
    selector: 'tiwoin-organization-list',
    templateUrl: `./organization-list.component.html`,
    styles: [`:host {@apply flex flex-col;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OrganizationListComponent {
    /**
     * Input
     */
    readonly profile = input<Partial<ProfileModel> | null>(null);
    readonly ownerOrganizationList = input<any[] | null>([]);
    readonly acceptedOrganizationList = input<any[] | null>([]);
    readonly unacceptedOrganizationList = input<any[] | null>([]);
    readonly error = input<string | null>(null);

    /**
     * Output
     */
    readonly accept = output();
    readonly reject = output();
    readonly setOrganization = output();
}

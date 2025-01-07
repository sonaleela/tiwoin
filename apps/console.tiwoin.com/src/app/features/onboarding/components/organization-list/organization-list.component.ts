import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProfileModel } from '@models';

@Component({
    selector: 'sonaleela-organization-list',
    templateUrl: './organization-list.component.html',
    styles: [`:host { @apply block bg-gray-75 p-10 h-full container mx-auto; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OrganizationListComponent {
    readonly profile = input<Partial<ProfileModel> | null>(null);
    readonly ownerOrganizationList = input<any[] | null>([]);
    readonly acceptedOrganizationList = input<any[] | null>([]);
    readonly unacceptedOrganizationList = input<any[] | null>([]);
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>(null);

    readonly accept = output();
    readonly reject = output();
    readonly setOrganization = output();
}

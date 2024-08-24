import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileModel } from '@models';

@Component({
    selector: 'tiwoin-organization-list',
    templateUrl: `./organization-list.component.html`,
    styles: [`:host {@apply flex flex-col;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListComponent {
    @Input() profile: Partial<ProfileModel> | null = null;
    @Input() ownerOrganizationList: any[] | null = [];
    @Input() acceptedOrganizationList: any[] | null = [];
    @Input() unacceptedOrganizationList: any[] | null = [];
    @Input() error: string | null = null;

    @Output() accept = new EventEmitter();
    @Output() reject = new EventEmitter();
    @Output() setOrganization = new EventEmitter();
}

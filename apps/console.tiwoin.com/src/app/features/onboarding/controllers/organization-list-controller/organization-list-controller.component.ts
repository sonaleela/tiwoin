import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";
import { map } from 'rxjs/operators';

@Component({
    selector: 'sonaleela-organization-list-controller',
    templateUrl: './organization-list-controller.component.html',
    styles: [`:host { @apply block h-full bg-gray-75;} `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListControllerComponent {
    private store: Store = inject(Store);

    profile$ = this.store.select(fromRootStore.selectProfile);
    ownerOrganizationList$ = this.store.select(fromRootStore.selectOrganizationList)
        .pipe(map((list) => list.filter(organization => (organization as any).role === 'OWNER')));
    acceptedOrganizationList$ = this.store.select(fromRootStore.selectOrganizationList)
        .pipe(map((list) => list.filter(organization => !!(organization as any).isAccepted && (organization as any).role !== 'OWNER')));
    unacceptedOrganizationList$ = this.store.select(fromRootStore.selectOrganizationList)
        .pipe(map((list) => list.filter(organization => !(organization as any).isAccepted && (organization as any).role !== 'OWNER')));
    error$ = this.store.select(fromRootStore.selectOrganizationListError);
    isPending$ = this.store.select(fromRootStore.selectIsOrganizationListPending);
    isInitPending$ = this.store.select(fromRootStore.selectIsInitPending);

    accept(event: any) {
        this.store.dispatch(fromStore.UpdateInvitationBegin({ body: { isAccepted: true, id: event.id } }));
    }

    reject(event: any) {
        this.store.dispatch(fromStore.UpdateInvitationBegin({ body: { isAccepted: false, id: event.id } }));
    }

    setOrganization(event: any) {
        this.store.dispatch(fromRootStore.SetDefaultOrganizationBegin({ organizationId: event.organizationId }));
    }
}

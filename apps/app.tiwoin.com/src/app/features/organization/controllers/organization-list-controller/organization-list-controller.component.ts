import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";

@Component({
    selector: 'tiwoin-organization-list-controller',
    templateUrl: `./organization-list-controller.component.html`,
    styles: [`:host { @apply block h-full bg-gray-75 h-full overflow-y-auto p-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListControllerComponent {
    private store: Store = inject(Store);

    selectedOrganization$ = this.store.select(fromRootStore.selectOrganization);
    profile$ = this.store.select(fromRootStore.selectProfile);
    ownerOrganizationList$ = this.store.select(fromRootStore.selectOrganizationList)
        .pipe(map((list) => list.filter(organization => (organization as any).role === 'OWNER')));
    acceptedOrganizationList$ = this.store.select(fromRootStore.selectOrganizationList)
        .pipe(map((list) => list.filter(organization => !!(organization as any).isAccepted && (organization as any).role !== 'OWNER')));
    unacceptedOrganizationList$ = this.store.select(fromRootStore.selectOrganizationList)
        .pipe(map((list) => list.filter(organization => !(organization as any).isAccepted && (organization as any).role !== 'OWNER')));
    list$ = this.store.select(fromRootStore.selectOrganizationList);
    error$ = this.store.select(fromRootStore.selectFetchOrganizationListError);
    isPending$ = this.store.select(fromRootStore.selectIsFetchOrganizationListPending);
    isInitPending$ = this.store.select(fromRootStore.selectIsInitPending);

    selectOrganization(event: any) {
        this.store.dispatch(fromRootStore.SetAppOrganization({ organization: event }));
    }

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

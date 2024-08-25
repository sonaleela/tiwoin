import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { OrganizationModel } from '@models';
import * as fromStore from '../../store';
import * as fromRootStore from "@store";

@Component({
    selector: 'sonaleela-create-organization-controller',
    templateUrl: './create-organization-controller.component.html',
    styles: [':host { @apply flex flex-col h-full;}'],
})
export class CreateOrganizationControllerComponent {
    private store: Store = inject(Store);

    // If user already has one organization in it's app state then we show back button
    organization$ = this.store.select(fromRootStore.selectOrganization);
    isPending$ = this.store.select(fromStore.selectIsCreateOrganizationPending);
    error$ = this.store.select(fromStore.selectCreateOrganizationError);

    submitForm(body: OrganizationModel) {
        this.store.dispatch(fromStore.CreateOrganizationBegin({ body }));
    }
}

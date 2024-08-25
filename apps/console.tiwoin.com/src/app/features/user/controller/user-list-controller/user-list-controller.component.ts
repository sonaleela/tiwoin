import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from '@store';
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-user-list-controller',
    templateUrl: './user-list-controller.component.html',
    styles: [`:host {  @apply flex flex-col h-full; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectUserList);
    currentUser$ = this.store.select(fromRootStore.selectProfile);
    isPending$ = this.store.select(fromRootStore.selectIsUserListPending);
    userListError$ = this.store.select(fromRootStore.selectUserListError);

    delete(id: string) {
        this.store.dispatch(fromStore.DeleteInvitedUserBegin({ id }));
    }
}

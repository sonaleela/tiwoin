import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-invite-user-controller',
    templateUrl: './invite-user-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteUserControllerComponent {
    private store: Store = inject(Store);

    isPending$ = this.store.select(fromStore.selectIsInvitePending);
    error$ = this.store.select(fromStore.selectInviteError);

    submit(user: any) {
        this.store.dispatch(fromStore.InviteUserBegin({ user }))
    }
}

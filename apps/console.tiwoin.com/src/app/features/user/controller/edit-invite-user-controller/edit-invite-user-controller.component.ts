import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import * as fromRootStore from '@store';
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-edit-invite-user-controller',
    templateUrl: './edit-invite-user-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInviteUserControllerComponent {
    private store: Store = inject(Store);

    isPending$ = this.store.select(fromStore.selectIsUpdatePending);
    updateError$ = this.store.select(fromStore.selectUpdateError);
    user$ = this.store.select(fromRootStore.selectActiveUser);

    submit(user: any) {
        this.store.dispatch(fromStore.UpdateInvitedUserBegin({ user }));
    }
}

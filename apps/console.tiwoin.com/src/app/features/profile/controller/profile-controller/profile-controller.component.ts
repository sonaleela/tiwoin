import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";
import * as fromRootStore from "@store";

@Component({
    selector: 'sonaleela-profile-controller',
    templateUrl: './profile-controller.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileControllerComponent {
    private store: Store = inject(Store);

    profile$ = this.store.select(fromRootStore.selectProfile)
    isProfile$ = this.store.select(fromStore.selectIsUpdatePending);
    error$ = this.store.select(fromStore.selectUpdateError);

    updateProfile(profile: any) {
        this.store.dispatch(fromStore.UpdateProfileBegin({ profile }));
    }
}

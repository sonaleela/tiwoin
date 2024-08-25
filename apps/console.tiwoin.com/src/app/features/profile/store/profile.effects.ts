import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from '@ngrx/store';
import { UserService } from '@services';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import * as fromRootStore from "@store";
import * as fromActions from "./profile.actions";

@Injectable()
export class ProfileEffects {
    private actions$: Actions = inject(Actions);
    private store: Store = inject(Store)
    private userService: UserService = inject(UserService)

    updateProfileBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateProfileBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectProfile)),
        exhaustMap(([payload, profile]) => {
            if (!profile?.id) throw new Error('User id is not available!');

            return this.userService.update(profile.id, payload.profile)
        }),
        map(profile => fromActions.UpdateProfileSuccess({ profile })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UpdateProfileFail({ error }));
            return caught;
        }),
    ));
}

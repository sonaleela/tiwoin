import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, mergeMap } from 'rxjs/operators';

import { OrganizationService } from '@services';
import * as fromActions from './organization.actions';
import * as fromRootStore from "@store";

@Injectable()
export class OrganizationEffects {
    private actions$: Actions = inject(Actions);
    private organizationService: OrganizationService = inject(OrganizationService);
    private store: Store = inject(Store);

    /**
     * Update organization user invitation either by accepting or rejecting
     */
    updateInvitationBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateInvitationBegin),
        exhaustMap(payload => {
            const { id, ...body } = payload.body;
            // TODO: update organization user with employeeID
            return this.organizationService.updateInvitation(id, body);
        }),
        mergeMap(_ => [fromActions.UpdateInvitationSuccess(), fromRootStore.PostAuthenticationInitBegin()]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UpdateInvitationFail({ error: error?.error?.message }));
            return caught;
        })
    ));
}

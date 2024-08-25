import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { catchError, exhaustMap, filter, flatMap, map, mergeMap, tap } from 'rxjs/operators';

import * as fromActions from './user.actions';
import * as fromRootStore from "@store";
import { OrganizationService, UserService } from '@services';
import { Dialog } from '@angular/cdk/dialog';
import { DeleteUserDialogComponent } from '@shared';

@Injectable()
export class UserEffects {
    private actions$: Actions = inject(Actions);
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private organizationService: OrganizationService = inject(OrganizationService);
    private dialog: Dialog = inject(Dialog);

    /**
     * Invite user
     */
    inviteUserBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.InviteUserBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectOrganization)),
        exhaustMap(([payload, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");

            return this.organizationService.inviteUser({ ...payload.user, organizationId: organization?.id });
        }),
        map(response => fromActions.InviteUserSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.InviteUserFail({ error: error?.error.message }));
            return caught;
        })
    ));

    /**
     * Update invited user
     */
    updateInvitedUserBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateInvitedUserBegin),
        concatLatestFrom(_ => [
            this.store.select(fromRootStore.selectRouteParam('uid')),
        ]),
        exhaustMap(([payload, uid]) => {
            if (!uid) throw new Error("Organization-user is not selected!");

            return this.organizationService.updateUser(uid, payload.user);
        }),
        map(response => fromActions.UpdateInvitedUserSuccess({ response })),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UpdateInvitedUserFail({ error }));
            return caught;
        })
    ));

    /**
     * Redirect after Invitation or update invitation
     */
    inviteUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.InviteUserSuccess, fromActions.UpdateInvitedUserSuccess),
        tap(_ => this.router.navigate(['/user'])),
    ), { dispatch: false });

    /**
     * Delete user from organization
     */
    deleteInvitedUserBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.DeleteInvitedUserBegin),
        flatMap(payload => {
            const dialogRef = this.dialog.open<{ id: string }>(DeleteUserDialogComponent, {
                data: { id: payload.id },
            });

            return dialogRef.closed;
        }),
        filter(payload => payload !== undefined),
        exhaustMap((payload) => {
            if (!payload?.id) throw new Error("Organization user id is not present!");

            return this.organizationService.deleteUser(payload?.id);
        }),
        mergeMap(response => [fromActions.DeleteInvitedUserSuccess({ response }), fromRootStore.FetchUserListBegin()]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.DeleteInvitedUserFail({ error }));
            return caught;
        })
    ));
}

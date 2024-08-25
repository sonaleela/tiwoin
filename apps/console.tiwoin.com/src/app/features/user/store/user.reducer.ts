import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as fromActions from './user.actions';

export const userFeatureKey = 'user';

export interface State {
    isInvitePending: boolean,
    inviteError: string,

    isUpdatePending: boolean,
    updateError: string,
}

const initialState: State = {
    inviteError: '',
    isInvitePending: false,

    isUpdatePending: false,
    updateError: ''
};

export const reducer = createReducer(
    initialState,
    on(fromActions.InviteUserBegin, (state) => ({ ...state, isInvitePending: true, inviteError: '' })),
    on(fromActions.InviteUserFail, (state, props) => ({ ...state, isInvitePending: false, inviteError: props.error })),
    on(fromActions.InviteUserSuccess, (state) => ({ ...state, isInvitePending: false, inviteError: '' })),

    on(fromActions.UpdateInvitedUserBegin, (state) => ({ ...state, isUpdatePending: true, updateError: '' })),
    on(fromActions.UpdateInvitedUserFail, (state, props) => ({ ...state, isUpdatePending: false, updateError: props.error })),
    on(fromActions.UpdateInvitedUserSuccess, (state) => ({ ...state, isUpdatePending: false, updateError: '' })),
);

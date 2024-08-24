import { createReducer, on } from '@ngrx/store';

import * as fromActions from './organization.actions';

export const organizationFeatureKey = 'organization';


export interface State {
    isUpdateInvitationPending: boolean;
    updateInvitationError: string;
}

const initialState: State = {
    isUpdateInvitationPending: false,
    updateInvitationError: '',
};

export const reducer = createReducer(
    initialState,

    on(fromActions.UpdateInvitationBegin, state => ({ ...state, isUpdateInvitationPending: true, updateInvitationError: '' })),
    on(fromActions.UpdateInvitationFail, (state, props) => ({ ...state, isUpdateInvitationPending: false, updateInvitationError: props.error })),
    on(fromActions.UpdateInvitationSuccess, state => ({ ...state, isUpdateInvitationPending: false, updateInvitationError: '' })),
);

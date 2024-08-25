import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as fromActions from "./profile.actions";

export const profileFeatureKey = 'profile';
export interface State {
    isUpdatePending: boolean;
    updateError: string;
}

const initialState: State = {
    isUpdatePending: false,
    updateError: '',
};

export const reducer = createReducer(
    initialState,
    on(fromActions.UpdateProfileBegin, (state) => ({ ...state, isUpdatePending: true, updateError: '', })),
    on(fromActions.UpdateProfileFail, (state, props) => ({ ...state, isUpdatePending: false, updateError: props.error, })),
    on(fromActions.UpdateProfileSuccess, (state, props) => ({ ...state, isUpdatePending: false, updateError: '', })),
);

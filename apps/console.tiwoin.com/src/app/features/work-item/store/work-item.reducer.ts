import { createReducer, on } from '@ngrx/store';

import * as fromActions from './work-item.actions';

export const workItemFeatureKey = 'workItem';

export interface State {
    isAddWorkItemPending: boolean;
    addWorkItemError: string;

    isEditWorkItemPending: boolean;
    editWorkItemError: string;

    isSubmitPending: boolean;
    submitError: string;
}
const initialState: State = {
    isAddWorkItemPending: false,
    addWorkItemError: '',

    isEditWorkItemPending: false,
    editWorkItemError: '',

    isSubmitPending: false,
    submitError: '',
};

export const reducer = createReducer(
    initialState,
    on(fromActions.AddWorkItemBegin, (state) => ({ ...state, isAddWorkItemPending: true, addWorkItemError: '', })),
    on(fromActions.AddWorkItemFail, (state, props) => ({ ...state, isAddWorkItemPending: false, addWorkItemError: props.error, })),
    on(fromActions.AddWorkItemSuccess, (state) => ({ ...state, isAddWorkItemPending: false, addWorkItemError: '', })),

    on(fromActions.EditWorkItemBegin, state => ({ ...state, isEditWorkItemPending: true, editWorkItemError: '' })),
    on(fromActions.EditWorkItemFail, (state, props) => ({ ...state, isEditWorkItemPending: false, editWorkItemError: props.error })),
    on(fromActions.EditWorkItemSuccess, (state) => ({ ...state, isEditWorkItemPending: false, editWorkItemError: '' })),

    on(fromActions.SubmitWorkItemBegin, state => ({ ...state, isSubmitPending: true, submitError: '' })),
    on(fromActions.SubmitWorkItemFail, (state, props) => ({ ...state, isSubmitPending: false, submitError: props.error })),
    on(fromActions.SubmitWorkItemSuccess, state => ({ ...state, isSubmitPending: false, submitError: '' })),
);

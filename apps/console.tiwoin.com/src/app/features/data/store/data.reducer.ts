import { createReducer, on } from "@ngrx/store";
import * as fromActions from "./data.actions";

export const dataFeatureKey = 'data';

export interface State {
    isUpdateFormPending: boolean;
    updateFormError: string;

    isUpdateWorkItemPending: boolean;
    updateWorkItemError: string;

    isAddTimesheetPending: boolean;
    addTimesheetError: string;

    isUpdateTimesheetPending: boolean;
    updateTimesheetError: string;
}

const initialState: State = {
    isUpdateFormPending: false,
    updateFormError: '',

    isUpdateWorkItemPending: false,
    updateWorkItemError: '',

    isAddTimesheetPending: false,
    addTimesheetError: '',

    isUpdateTimesheetPending: false,
    updateTimesheetError: '',
}

export const reducer = createReducer(
    initialState,
    on(fromActions.UpdateFormDataBegin, (state) => ({ ...state, isUpdateFormPending: true, updateFormError: '' })),
    on(fromActions.UpdateFormDataFail, (state, props) => ({ ...state, isUpdateFormPending: false, updateFormError: props.error })),
    on(fromActions.UpdateFormDataSuccess, (state) => ({ ...state, isUpdateFormPending: false, updateFormError: '' })),

    on(fromActions.ApproveFormDataBegin, (state) => ({ ...state, isUpdateFormPending: true, updateFormError: '' })),
    on(fromActions.ApproveFormDataFail, (state, props) => ({ ...state, isUpdateFormPending: false, updateFormError: props.error })),
    on(fromActions.ApproveFormDataSuccess, (state) => ({ ...state, isUpdateFormPending: false, updateFormError: '' })),

    on(fromActions.UpdateWorkItemDataBegin, state => ({ ...state, isUpdateWorkItemPending: true, updateWorkItemError: '' })),
    on(fromActions.UpdateWorkItemDataFail, (state, props) => ({ ...state, isUpdateWorkItemPending: false, updateWorkItemError: props.error })),
    on(fromActions.UpdateWorkItemDataSuccess, state => ({ ...state, isUpdateWorkItemPending: false, updateWorkItemError: '' })),

    on(fromActions.ApproveWorkItemDataBegin, state => ({ ...state, isUpdateWorkItemPending: true, updateWorkItemError: '' })),
    on(fromActions.ApproveWorkItemDataFail, (state, props) => ({ ...state, isUpdateWorkItemPending: false, updateWorkItemError: props.error })),
    on(fromActions.ApproveWorkItemDataSuccess, state => ({ ...state, isUpdateWorkItemPending: false, updateWorkItemError: '' })),

    on(fromActions.AddTimesheetDataBegin, state => ({ ...state, isAddTimesheetPending: true, addTimesheetError: '' })),
    on(fromActions.AddTimesheetDataFail, (state, props) => ({ ...state, isAddTimesheetPending: false, addTimesheetError: props.error })),
    on(fromActions.AddTimesheetDataSuccess, (state) => ({ ...state, isAddTimesheetPending: false, addTimesheetError: '' })),

    on(fromActions.UpdateTimesheetDataBegin, state => ({ ...state, isUpdateTimesheetPending: true, updateTimesheetError: '' })),
    on(fromActions.UpdateTimesheetDataFail, (state, props) => ({ ...state, isUpdateTimesheetPending: false, updateTimesheetError: props.error })),
    on(fromActions.UpdateTimesheetDataSuccess, state => ({ ...state, isUpdateTimesheetPending: false, updateTimesheetError: '' })),
);

import { createReducer, on } from "@ngrx/store"

import * as fromActions from "./timesheet.actions";

export const timesheetFeatureKey = 'timesheet';
export interface State {
    isAddTimesheetPending: boolean;
    addTimesheetError: string;

    isEditTimesheetPending: boolean;
    editTimesheetError: string,
}

const initialState: State = {
    isAddTimesheetPending: false,
    addTimesheetError: '',

    isEditTimesheetPending: false,
    editTimesheetError: '',
}

export const reducer = createReducer(
    initialState,
    on(fromActions.AddTimesheetBegin, state => ({ ...state, isAddTimesheetPending: true, addTimesheetError: '' })),
    on(fromActions.AddTimesheetFail, (state, props) => ({ ...state, isAddTimesheetPending: false, addTimesheetError: props.error })),
    on(fromActions.AddTimesheetSuccess, state => ({ ...state, isAddTimesheetPending: false, addTimesheetError: '' })),

    on(fromActions.UpdateTimesheetBegin, state => ({ ...state, isEditTimesheetPending: true, editTimesheetError: '' })),
    on(fromActions.UpdateTimesheetFail, (state, props) => ({ ...state, isEditTimesheetPending: false, editTimesheetError: props.error })),
    on(fromActions.UpdateTimesheetSuccess, state => ({ ...state, isEditTimesheetPending: false, editTimesheetError: '' })),
)

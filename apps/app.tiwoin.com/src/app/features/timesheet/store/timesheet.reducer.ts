import { createReducer, on } from "@ngrx/store";

import * as fromActions from "./timesheet.actions";

export const timesheetFeatureKey = 'timesheet';

export interface State {
    isFetchTimesheetListPending: boolean;
    fetchTimesheetListError: string;

    isClockEntryPending: boolean;
    clockEntryError: string;

    clockEntry: any;
    isFetchClockEntryPending: boolean;
    fetchClockEntryError: string;

    entryTypes: any[];
    isEntryTypesPending: boolean;
    entryTypesError: string;
}

const initialState: State = {
    isFetchTimesheetListPending: false,
    fetchTimesheetListError: '',

    isClockEntryPending: false,
    clockEntryError: '',

    clockEntry: null,
    isFetchClockEntryPending: false,
    fetchClockEntryError: '',

    entryTypes: [],
    isEntryTypesPending: false,
    entryTypesError: ''
};

export const reducer = createReducer(
    initialState,
    on(fromActions.FetchTimesheetListBegin, state => ({ ...state, isFetchTimesheetListPending: true, fetchTimesheetListError: '' })),
    on(fromActions.FetchTimesheetListFail, (state, props) => ({ ...state, isFetchTimesheetListPending: false, fetchTimesheetListError: props.error })),
    on(fromActions.FetchTimesheetListSuccess, state => ({ ...state, isFetchTimesheetListPending: false, fetchTimesheetListError: '' })),

    on(fromActions.ClockEntryBegin, state => ({ ...state, isClockEntryPending: true, clockEntryError: '' })),
    on(fromActions.ClockEntryFail, (state, props) => ({ ...state, isClockEntryPending: false, clockEntryError: props.error })),
    on(fromActions.ClockEntrySuccess, state => ({ ...state, isClockEntryPending: false, clockEntryError: '' })),

    on(fromActions.FetchClockEntryBegin, state => ({ ...state, isFetchClockEntryPending: true, fetchClockEntryError: '' })),
    on(fromActions.FetchClockEntryFail, (state, props) => ({ ...state, isFetchClockEntryPending: false, fetchClockEntryError: props.error })),
    on(fromActions.FetchClockEntrySuccess, (state, props) => ({ ...state, isFetchClockEntryPending: false, fetchClockEntryError: '', clockEntry: props.response.data })),

    on(fromActions.FetchEntryTypeBegin, state => ({ ...state, isEntryTypesPending: true, entryTypesError: '' })),
    on(fromActions.FetchEntryTypeFail, (state, props) => ({ ...state, isEntryTypesPending: false, entryTypesError: props.error })),
    on(fromActions.FetchEntryTypeSuccess, (state, props) => ({ ...state, isEntryTypesPending: false, entryTypesError: '', entryTypes: props.response })),
);

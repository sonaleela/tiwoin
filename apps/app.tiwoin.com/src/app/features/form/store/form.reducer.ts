import { createReducer, on } from "@ngrx/store";

import * as fromActions from "./form.actions";

export const formFeatureKey = 'form';

export interface State {
    isSubmissionPending: boolean;
    submissionError: string;
}
const initialState: State = {
    isSubmissionPending: false,
    submissionError: ''
};

export const reducer = createReducer(
    initialState,
    on(fromActions.FormSubmissionBegin, (state) => ({
        ...state,
        isSubmissionPending: true,
        submissionError: '',
    })),
    on(fromActions.FormSubmissionCancel, (state) => ({
        ...state,
        isSubmissionPending: false,
        submissionError: '',
    })),
    on(fromActions.FormSubmissionFail, (state, props) => ({
        ...state,
        isSubmissionPending: false,
        submissionError: props.error,
    })),
    on(fromActions.FormSubmissionSuccess, (state) => ({
        ...state,
        isSubmissionPending: false,
        submissionError: '',
    })),
);

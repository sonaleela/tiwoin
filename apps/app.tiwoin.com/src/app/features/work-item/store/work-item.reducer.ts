import { createReducer, on } from '@ngrx/store';

import * as fromActions from './work-item.actions';

export const workItemFeatureKey = 'workItem';

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
    on(fromActions.WorkItemSubmissionBegin, (state) => ({
        ...state,
        isSubmissionPending: true,
        submissionError: '',
    })),
    on(fromActions.WorkItemSubmissionCancel, (state) => ({
        ...state,
        isSubmissionPending: false,
        submissionError: '',
    })),
    on(fromActions.WorkItemSubmissionFail, (state, props) => ({
        ...state,
        isSubmissionPending: false,
        submissionError: props.error,
    })),
    on(fromActions.WorkItemSubmissionSuccess, (state) => ({
        ...state,
        isSubmissionPending: false,
        submissionError: '',
    })),
);

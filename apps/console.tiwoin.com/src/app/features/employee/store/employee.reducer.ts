import { createReducer, on } from '@ngrx/store';

import { DocumentModel, EmployeeModel } from '@models';
import * as fromActions from './employee.actions';

export const employeeFeatureKey = 'employee';

export interface State {
    isAddEmployeePending: boolean;
    addEmployeeError: string;

    isAddDocumentForm: boolean;

    isRequestDocumentForm: boolean;
    isRequestDocumentPending: boolean;
    requestDocumentError: string;

    isUpdateEmployeePending: boolean;
    updateEmployeeError: string;

    documentList: DocumentModel[],
    isDocumentListPending: boolean,
    documentListError: string,

    isAddAdvancePaymentPending: boolean,
    addAdvancePaymentError: string,
    isAdvancePaymentForm: boolean;
}

const initialState: State = {
    isAddEmployeePending: false,
    addEmployeeError: '',

    isAddDocumentForm: false,

    isRequestDocumentForm: false,
    isRequestDocumentPending: false,
    requestDocumentError: '',

    isUpdateEmployeePending: false,
    updateEmployeeError: '',

    documentList: [],
    isDocumentListPending: false,
    documentListError: '',

    isAddAdvancePaymentPending: false,
    addAdvancePaymentError: '',
    isAdvancePaymentForm: false,
};

export const reducer = createReducer(
    initialState,
    on(fromActions.AddEmployeeBegin, (state) => ({ ...state, isAddEmployeePending: true, addEmployeeError: '' })),
    on(fromActions.AddEmployeeFail, (state, props) => ({ ...state, isAddEmployeePending: false, addEmployeeError: props.error })),
    on(fromActions.AddEmployeeSuccess, (state, props) => ({ ...state, isAddEmployeePending: false, addEmployeeError: '' })),

    on(fromActions.UpdateEmployeeBegin, state => ({ ...state, isUpdateEmployeePending: true, updateEmployeeError: '' })),
    on(fromActions.UpdateEmployeeFail, (state, props) => ({ ...state, isUpdateEmployeePending: false, updateEmployeeError: props?.error })),
    on(fromActions.UpdateEmployeeSuccess, (state, props) => ({ ...state, isUpdateEmployeePending: false, updateEmployeeError: '' })),

    on(fromActions.ToggleAddDocumenForm, (state, props) => ({ ...state, isAddDocumentForm: props?.flag ?? !state.isAddDocumentForm })),

    on(fromActions.ToggleRequestDocumentForm, (state, props) => ({ ...state, isRequestDocumentForm: props?.flag ?? !state.isRequestDocumentForm })),
    on(fromActions.RequestDocumentBegin, state => ({ ...state, isRequestDocumentPending: true })),
    on(fromActions.RequestDocumentFail, (state, props) => ({ ...state, isRequestDocumentPending: false, requestDocumentError: props?.error })),
    on(fromActions.RequestDocumentSuccess, (state, props) => ({ ...state, isAddDocumentForm: false, isRequestDocumentForm: false, isRequestDocumentPending: false, requestDocumentError: '' })),

    on(fromActions.FetchDocumentListBegin, (state) => ({ ...state, isDocumentListPending: true, documentListError: '' })),
    on(fromActions.FetchDocumentListFail, (state, props) => ({ ...state, isDocumentListPending: false, documentListError: props?.error })),
    on(fromActions.FetchDocumentListSuccess, (state, props) => ({ ...state, documentList: props.response, isDocumentListPending: false, documentListError: '' })),

    on(fromActions.AddAdvancePaymentBegin, state => ({ ...state, isAddAdvancePaymentPending: true, addAdvancePaymentError: '' })),
    on(fromActions.AddAdvancePaymentFail, (state, props) => ({ ...state, isAddAdvancePaymentPending: false, addAdvancePaymentError: props.error })),
    on(fromActions.AddAdvancePaymentSuccess, (state, props) => ({ ...state, isAddAdvancePaymentPending: false, addAdvancePaymentError: '' })),
    on(fromActions.ToggleAdvancePaymentForm, (state, props) => ({ ...state, isAdvancePaymentForm: props?.flag ?? !state.isAdvancePaymentForm })),
);

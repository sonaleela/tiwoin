import { createReducer, on } from '@ngrx/store';

import * as fromActions from './payroll.actions';

export const payrollFeatureKey = 'payroll';

export interface State {
    filterPayrollComponentsBy: { [key: string]: string } | null;
    selectedPayrollComponentIds: any[];
    isPayrollSidenavForm: boolean,

    isAddPayrollPending: boolean,
    addPayrollError: string,
    isEditPayrollPending: boolean,
    editPayrollError: string,

    isAddPayrollComponentPending: boolean,
    addPayrollComponentError: string
}

const initialState: State = {
    filterPayrollComponentsBy: null,
    selectedPayrollComponentIds: [],
    isPayrollSidenavForm: false,

    isAddPayrollPending: false,
    addPayrollError: '',
    isEditPayrollPending: false,
    editPayrollError: '',

    isAddPayrollComponentPending: false,
    addPayrollComponentError: ''
};

export const reducer = createReducer(
    initialState,
    on(fromActions.FilterPayrollComponentList, (state, props) => ({ ...state, filterPayrollComponentsBy: props.filter })),
    on(fromActions.SelectPayrollComponentId, (state, props) => {
        const ids: string[] = Array.isArray(props?.id) ? props.id : [props.id];
        return { ...state, selectedPayrollComponentIds: [...state.selectedPayrollComponentIds, ...ids] }
    }),
    on(fromActions.UnSelectPayrollComponentId, (state, props) => {
        const ids: string[] = state.selectedPayrollComponentIds.filter(id => id !== props.id);
        return { ...state, selectedPayrollComponentIds: [...ids] }
    }),
    on(fromActions.TogglePayrollComponentBar, state => ({ ...state, isPayrollSidenavForm: !state.isPayrollSidenavForm })),

    on(fromActions.AddPayrollBegin, state => ({ ...state, isAddPayrollPending: true, addPayrollError: '' })),
    on(fromActions.AddPayrollFail, (state, props) => ({ ...state, isAddPayrollPending: false, addPayrollError: props.error })),
    on(fromActions.AddPayrollSuccess, state => ({ ...state, isAddPayrollPending: false, addPayrollError: '' })),

    on(fromActions.UpdatePayrollBegin, state => ({ ...state, isEditPayrollPending: true, editPayrollError: '' })),
    on(fromActions.UpdatePayrollFail, (state, props) => ({ ...state, isEditPayrollPending: false, editPayrollError: props.error })),
    on(fromActions.UpdatePayrollSuccss, state => ({ ...state, isEditPayrollPending: false, editPayrollError: '' })),

    on(fromActions.AddPayrollComponentBegin, state => ({ ...state, isAddPayrollComponentPending: true, addPayrollComponentError: '' })),
    on(fromActions.AddPayrollComponentFail, (state, props) => ({ ...state, isAddPayrollComponentPending: false, addPayrollComponentError: props.error })),
    on(fromActions.AddPayrollComponentSuccess, state => ({ ...state, isAddPayrollComponentPending: false, addPayrollComponentError: '' })),
);

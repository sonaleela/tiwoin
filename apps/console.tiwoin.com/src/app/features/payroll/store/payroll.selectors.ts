import { createFeatureSelector, createSelector } from '@ngrx/store';

import { payrollFeatureKey, State } from './payroll.reducer';
import * as fromRootStore from '@store';
import { isSubsetShallow } from '@shared';

const selectPayrollState = createFeatureSelector<State>(payrollFeatureKey);

export const selectIsPayrollSidenavForm = createSelector(selectPayrollState, state => state.isPayrollSidenavForm);
export const selectFilterPayrollComponentsBy = createSelector(selectPayrollState, (state) => state.filterPayrollComponentsBy);
export const selectedPayrollComponentIds = createSelector(selectPayrollState, (state) => state.selectedPayrollComponentIds);

export const selectPayrollComponentList = createSelector(
    fromRootStore.selectPayrollComponentList,
    selectFilterPayrollComponentsBy,
    (list, filter) => {
        if (!filter || JSON.stringify(filter) === '{}') return list;
        return list.filter((comp) => isSubsetShallow(comp, filter));
    },
);
export const selectedPayrollComponent = createSelector(
    fromRootStore.selectPayrollComponentList,
    selectedPayrollComponentIds,
    (list, ids) => {
        return list.filter((comp) => ids.includes(comp.id));
    },
);

export const selectIsAddPayrollPending = createSelector(selectPayrollState, state => state.isAddPayrollPending);
export const selectAddPayrollError = createSelector(selectPayrollState, state => state.addPayrollError);
export const selectIsEditPayrollPending = createSelector(selectPayrollState, state => state.isEditPayrollPending);
export const selectEditPayrollError = createSelector(selectPayrollState, state => state.editPayrollError);
export const selectisAddPayrollComponentPending = createSelector(selectPayrollState, state => state.isAddPayrollComponentPending);
export const selectAddPayrollComponentError = createSelector(selectPayrollState, state => state.addPayrollComponentError);

import { createAction, props } from '@ngrx/store';
import { PayrollComponentModel, PayrollModel } from '@models';

export const FilterPayrollComponentList = createAction('[Payroll] Filter Payroll Component List', props<{ filter: { [key: string]: string } }>());
export const SelectPayrollComponentId = createAction('[Payroll] Select Payroll Component Id', props<{ id: string | string[] }>());
export const UnSelectPayrollComponentId = createAction('[Payroll] UnSelect Payroll Component Id', props<{ id: string }>());
export const TogglePayrollComponentBar = createAction('[Payroll] Toggle Payroll Component Bar');

export const AddPayrollBegin = createAction('[Payroll] Add Payroll Begin', props<{ body: PayrollModel }>());
export const AddPayrollFail = createAction('[Payroll] Add Payroll Fail', props<{ error: string }>());
export const AddPayrollSuccess = createAction('[Payroll] Add Payroll Success', props<{ response: any }>());

export const UpdatePayrollBegin = createAction('[Payroll] Update Payroll Begin', props<{ body: PayrollModel }>());
export const UpdatePayrollFail = createAction('[Payroll] Update Payroll Fail', props<{ error: string }>());
export const UpdatePayrollSuccss = createAction('[Payroll] Update Payroll Success', props<{ response: any }>());

export const AddPayrollComponentBegin = createAction('[Payroll] Add Payroll Component Begin', props<{ body: PayrollComponentModel }>());
export const AddPayrollComponentFail = createAction('[Payroll] Add Payroll Component Fail', props<{ error: string }>());
export const AddPayrollComponentSuccess = createAction('[Payroll] Add Payroll Component Success', props<{ response: any }>());

export const DeletePayrollBegin = createAction('[Payroll] Delete Payroll Begin', props<{ id: string }>());
export const DeletePayrollFail = createAction('[Payroll] Delete Payroll Fail', props<{ error: string }>());
export const DeletePayrollSuccess = createAction('[Payroll] Delete Payroll Succeess', props<{ response: string }>());

export const DeletePayrollComponentBegin = createAction('[Payroll] Delete Payroll Component Begin', props<{ id: string }>());
export const DeletePayrollComponentFail = createAction('[Payroll] Delete Payroll Component Fail', props<{ error: string }>());
export const DeletePayrollComponentSuccess = createAction('[Payroll] Delete Payroll Component Success', props<{ response: string }>());

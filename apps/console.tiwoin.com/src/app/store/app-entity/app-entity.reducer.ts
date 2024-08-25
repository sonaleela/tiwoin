import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { EmployeeModel, FilterList, FormModal, OrganizationModel, PayrollComponentModel, PayrollModel, SiteModel, TimesheetModel, UserModel, WorkItemModal } from '@models';
import * as fromActions from './app-entity.actions';
import { emptyFilterObject } from '@shared';

export const appEntityFeatureKey = 'appEntity';

interface OrganizationEntityState extends EntityState<OrganizationModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
}
interface EmployeeEntityState extends EntityState<EmployeeModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
    isActiveEmployeePending: boolean;
    activeEmployeeError: string | null;
}
interface PayrollEntityState extends EntityState<PayrollModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
}
interface PayrollComponentEntityState extends EntityState<PayrollComponentModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
}
interface WorkItemEntityState extends EntityState<WorkItemModal> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
}
interface SiteEntityState extends EntityState<SiteModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
}
interface FormEntityState extends EntityState<FormModal> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
}

interface UserEntityState extends EntityState<UserModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
}

interface TimesheetEntityState extends EntityState<TimesheetModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
}

interface TimesheetDataEntityState extends EntityState<TimesheetModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
    total: number | null;
    filter: FilterList;
}

interface FormDataEntityState extends EntityState<FormModal> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
    total: number | null;
    filter: FilterList;
}

interface PayrollDataEntityState extends EntityState<PayrollModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
    total: number | null;
    filter: FilterList;
}

interface WorkItemDataEntityState extends EntityState<WorkItemModal> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
    total: number | null;
    filter: FilterList;
}

interface AdvancePaymentDataEntityState extends EntityState<any> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
    total: number | null;
    filter: FilterList;
}

export const organizationEntityAdapter = createEntityAdapter<OrganizationModel>();
export const employeeEntityAdapter = createEntityAdapter<EmployeeModel>();
export const payrollEntityAdapter = createEntityAdapter<PayrollModel>();
export const payrollComponentEntityAdapter = createEntityAdapter<PayrollComponentModel>();
export const workItemEntityAdapter = createEntityAdapter<WorkItemModal>();
export const siteEntityAdapter = createEntityAdapter<SiteModel>();
export const formEntityAdapter = createEntityAdapter<FormModal>();
export const userEntityAdapter = createEntityAdapter<UserModel>();
export const timesheetEntityAdapter = createEntityAdapter<TimesheetModel>();
export const timesheetDataEntityAdapter = createEntityAdapter<TimesheetModel>();
export const formDataEntityAdapter = createEntityAdapter<FormModal>();
export const payrollDataEntityAdapter = createEntityAdapter<PayrollModel>();
export const workItemDataEntityAdapter = createEntityAdapter<WorkItemModal>();
export const advancePaymentDataEntityAdapter = createEntityAdapter<any>();

export interface AppEntityState {
    organizationEntity: OrganizationEntityState;
    employeeEntity: EmployeeEntityState;
    payrollEntity: PayrollEntityState;
    payrollComponentEntity: PayrollComponentEntityState;
    workItemEntity: WorkItemEntityState;
    siteEntity: SiteEntityState;
    formEntity: FormEntityState;
    userEntity: UserEntityState;
    timesheetEntity: TimesheetEntityState;
    timesheetDataEntity: TimesheetDataEntityState;
    formDataEntity: FormDataEntityState;
    payrollDataEntity: PayrollDataEntityState;
    workItemDataEntity: WorkItemDataEntityState;
    advancePaymentDataEntity: AdvancePaymentDataEntityState;
}

const initialState: AppEntityState = {
    organizationEntity: organizationEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    employeeEntity: employeeEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, isActiveEmployeePending: false, activeEmployeeError: null, }),
    payrollEntity: payrollEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    payrollComponentEntity: payrollComponentEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    workItemEntity: workItemEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    siteEntity: siteEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    formEntity: formEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    userEntity: userEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    timesheetEntity: timesheetEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    timesheetDataEntity: timesheetDataEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, total: null, filter: emptyFilterObject() }),
    formDataEntity: formDataEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, total: null, filter: emptyFilterObject() }),
    payrollDataEntity: payrollDataEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, total: null, filter: emptyFilterObject() }),
    workItemDataEntity: workItemDataEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, total: null, filter: emptyFilterObject() }),
    advancePaymentDataEntity: advancePaymentDataEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, total: null, filter: emptyFilterObject() }),
};

export const appEntityReducer = createReducer(
    initialState,

    // ----------------------------------------------------- Organization ---------------------------------------------------------------------
    on(fromActions.FetchOrganizationListBegin, (state) => ({
        ...state,
        organizationEntity: { ...state.organizationEntity, isPending: true, error: null },
    })),
    on(fromActions.FetchOrganizationListFail, (state, props) => ({
        ...state,
        organizationEntity: { ...state.organizationEntity, isPending: false, error: props.error },
    })),
    on(fromActions.FetchOrganizationListSuccess, (state, props) => ({
        ...state,
        organizationEntity: organizationEntityAdapter.addMany(props.response?.data || [], {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        }),
    })),

    // ----------------------------------------------------- Employee ---------------------------------------------------------------------
    on(fromActions.FetchEmployeeListBegin, (state) => ({
        ...state,
        employeeEntity: { ...state.employeeEntity, isPending: true, error: null },
    })),
    on(fromActions.FetchEmployeeListFail, (state, props) => ({
        ...state,
        employeeEntity: { ...state.employeeEntity, isPending: false, error: props.error },
    })),
    on(fromActions.FetchEmployeeListSuccess, (state, props) => ({
        ...state,
        employeeEntity: employeeEntityAdapter.addMany(props.response?.data, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null,
            activeEmployeeError: null,
            isActiveEmployeePending: false,
        }),
    })),
    on(fromActions.FetchEmployeeBegin, (state, props) => {
        return {
            ...state,
            employeeEntity: { ...state.employeeEntity, activeId: props.uid, isActiveEmployeePending: true },
        };
    }),
    on(fromActions.FetchEmployeeSuccess, (state, props) => ({
        ...state,
        employeeEntity: employeeEntityAdapter.upsertOne(props.employee, { ...state.employeeEntity, isActiveEmployeePending: false }),
    })),

    // ----------------------------------------------------- payroll ---------------------------------------------------------------------
    on(fromActions.FetchPayrollListBegin, (state) => ({
        ...state,
        payrollEntity: { ...state.payrollEntity, isPending: true, error: null },
    })),
    on(fromActions.FetchPayrollListFail, (state, props) => ({
        ...state,
        payrollEntity: { ...state.payrollEntity, isPending: false, error: props.error },
    })),
    on(fromActions.FetchPayrollListSuccess, (state, props) => ({
        ...state,
        payrollEntity: payrollEntityAdapter.addMany(props.response, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        }),
    })),
    on(fromActions.FetchPayrollBegin, (state, props) => {
        return {
            ...state,
            payrollEntity: { ...state.payrollEntity, activeId: props.uid },
        };
    }),
    on(fromActions.FetchPayrollSuccess, (state, props) => ({
        ...state,
        payrollEntity: payrollEntityAdapter.addOne(props.payroll, { ...state.payrollEntity }),
    })),

    // ----------------------------------------------------- payroll component ---------------------------------------------------------------------
    on(fromActions.FetchPayrollComponentListBegin, (state) => ({
        ...state,
        payrollComponentEntity: { ...state.payrollComponentEntity, isPending: true, error: null },
    })),
    on(fromActions.FetchPayrollComponentListFail, (state, props) => ({
        ...state,
        payrollComponentEntity: { ...state.payrollComponentEntity, isPending: false, error: props.error },
    })),
    on(fromActions.FetchPayrollComponentListSuccess, (state, props) => ({
        ...state,
        payrollComponentEntity: payrollComponentEntityAdapter.addMany(props.response, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null,
        }),
    })),

    // ----------------------------------------------------- Work item ---------------------------------------------------------------------
    on(fromActions.FetchWorkItemListBegin, (state) => ({
        ...state,
        workItemEntity: { ...state.workItemEntity, isPending: true, error: null },
    })),
    on(fromActions.FetchWorkItemListFail, (state) => ({
        ...state,
        workItemEntity: { ...state.workItemEntity, isPending: false, error: null },
    })),
    on(fromActions.FetchWorkItemListSuccess, (state, props) => ({
        ...state,
        workItemEntity: workItemEntityAdapter.addMany(props.response, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        }),
    })),
    on(fromActions.FetchWorkItemBegin, (state, props) => ({ ...state, workItemEntity: { ...state.workItemEntity, activeId: props.uid } })),
    on(fromActions.FetchWorkItemSuccess, (state, props) => ({ ...state, workItemEntity: workItemEntityAdapter.addOne(props.workItem, { ...state.workItemEntity }) })),

    // ----------------------------------------------------- Site item ---------------------------------------------------------------------
    on(fromActions.FetchSiteListBegin, (state) => ({ ...state, siteEntity: { ...state.siteEntity, isPending: true, error: null } })),
    on(fromActions.FetchSiteListFail, (state) => ({ ...state, siteEntity: { ...state.siteEntity, isPending: false, error: null } })),
    on(fromActions.FetchSiteListSuccess, (state, props) => ({
        ...state,
        siteEntity: siteEntityAdapter.addMany(props.response, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        }),
    })),
    on(fromActions.FetchSiteBegin, (state, props) => ({ ...state, siteEntity: { ...state.siteEntity, isPending: true, error: null, activeId: props.uid } })),
    on(fromActions.FetchSiteFail, (state) => ({ ...state, siteEntity: { ...state.siteEntity, isPending: false, error: null } })),
    on(fromActions.FetchSiteSuccess, (state, props) => ({ ...state, siteEntity: siteEntityAdapter.addOne(props.site, { ...state.siteEntity, isPending: false, error: null }) })),

    // ----------------------------------------------------- Form item ---------------------------------------------------------------------
    on(fromActions.FetchFormListBegin, (state) => ({ ...state, formEntity: { ...state.formEntity, isPending: true, error: null } })),
    on(fromActions.FetchFormListFail, (state) => ({ ...state, formEntity: { ...state.formEntity, isPending: false, error: null } })),
    on(fromActions.FetchFormListSuccess, (state, props) => ({
        ...state,
        formEntity: formEntityAdapter.addMany(props.response, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        }),
    })),
    on(fromActions.FetchFormBegin, (state, props) => ({
        ...state,
        formEntity: { ...state.formEntity, isPending: true, error: null, activeId: props.uid },
    })),
    on(fromActions.FetchFormFail, (state) => ({ ...state, formEntity: { ...state.formEntity, isPending: false, error: null } })),
    on(fromActions.FetchFormSuccess, (state, props) => ({
        ...state,
        formEntity: formEntityAdapter.addOne(props.form, { ...state.formEntity, isPending: false, error: null }),
    })),

    // ----------------------------------------------------- User ---------------------------------------------------------------------
    on(fromActions.FetchUserListBegin, state => ({ ...state, userEntity: { ...state.userEntity, isPending: true, error: null } })),
    on(fromActions.FetchUserListFail, state => ({ ...state, userEntity: { ...state.userEntity, isPending: false, error: null } })),
    on(fromActions.FetchUserListSuccess, (state, props) => ({
        ...state, userEntity: userEntityAdapter.addMany(props.response.data, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        })
    })),
    on(fromActions.FetchUserBegin, (state, props) => ({ ...state, userEntity: { ...state.userEntity, activeId: props.uid } })),
    on(fromActions.FetchUserSuccess, (state, props) => ({
        ...state,
        userEntity: userEntityAdapter.addOne(props.response, { ...state.userEntity })
    })),
    // ----------------------------------------------------- Timesheet ---------------------------------------------------------------------
    on(fromActions.FetchTimesheetListBegin, state => ({ ...state, timesheetEntity: { ...state.timesheetEntity, isPending: true, error: null } })),
    on(fromActions.FetchTimesheetListFail, state => ({ ...state, timesheetEntity: { ...state.timesheetEntity, isPending: false, error: null } })),
    on(fromActions.FetchTimesheetListSuccess, (state, props) => ({
        ...state, timesheetEntity: timesheetEntityAdapter.addMany(props.response, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        })
    })),
    on(fromActions.FetchTimesheetBegin, (state, props) => ({ ...state, timesheetEntity: { ...state.timesheetEntity, activeId: props.uid } })),
    on(fromActions.FetchTimesheetSuccess, (state, props) => ({
        ...state,
        timesheetEntity: timesheetEntityAdapter.addOne(props.response, { ...state.timesheetEntity }),
    })),

    // ----------------------------------------------------- timesheet data ---------------------------------------------------------------------
    on(fromActions.FetchTimesheetDataBegin, (state, props) => ({
        ...state,
        timesheetDataEntity: {
            ...state.timesheetDataEntity,
            isPending: true,
            error: null,
            filter: { ...state.timesheetDataEntity.filter, ...props.filter },
        }
    })),
    on(fromActions.FetchTimesheetDataFail, state => ({ ...state, timesheetDataEntity: { ...state.timesheetDataEntity, isPending: false, error: null } })),
    on(fromActions.FetchTimesheetDataSuccess, (state, props) => ({
        ...state, timesheetDataEntity: timesheetDataEntityAdapter.addMany(props.response?.data, {
            ...state.timesheetDataEntity,
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null,
            total: props.response?.total,
        })
    })),
    on(fromActions.FetchTimesheetDataRecordBegin, (state, props) => ({ ...state, timesheetDataEntity: { ...state.timesheetDataEntity, activeId: props.uid } })),
    on(fromActions.FetchTimesheetDataRecordSuccess, (state, props) => ({
        ...state,
        timesheetDataEntity: timesheetDataEntityAdapter.addOne(props.response, { ...state.timesheetDataEntity }),
    })),

    // ----------------------------------------------------- form data ---------------------------------------------------------------------    
    on(fromActions.FetchFormDataBegin, (state, props) => ({
        ...state,
        formDataEntity: {
            ...state.formDataEntity,
            isPending: true,
            error: null,
            filter: { ...state.formDataEntity.filter, ...props.filter },
        }
    })),
    on(fromActions.FetchFormDataFail, state => ({ ...state, formDataEntity: { ...state.formDataEntity, isPending: false, error: null } })),
    on(fromActions.FetchFormDataSuccess, (state, props) => ({
        ...state, formDataEntity: formDataEntityAdapter.addMany(props.response?.data, {
            ...state.formDataEntity,
            entities: {},
            ids: [],
            activeId: state.formDataEntity.activeId ?? null,
            isPending: false,
            error: null,
            total: props.response?.total,
        })
    })),
    on(fromActions.FetchFormDataRecordBegin, (state, props) => ({ ...state, formDataEntity: { ...state.formDataEntity, activeId: props.uid } })),
    on(fromActions.FetchFormDataRecordSuccess, (state, props) => ({
        ...state,
        formDataEntity: formDataEntityAdapter.addOne(props.response, { ...state.formDataEntity }),
    })),

    // payroll data
    on(fromActions.FetchPayrollDataBegin, (state, props) => ({
        ...state,
        payrollDataEntity: {
            ...state.payrollDataEntity,
            isPending: true,
            error: null,
            filter: { ...state.payrollDataEntity.filter, ...props.filter },
        }
    })),
    on(fromActions.FetchPayrollDataFail, state => ({ ...state, payrollDataEntity: { ...state.payrollDataEntity, isPending: false, error: null } })),
    on(fromActions.FetchPayrollDataSuccss, (state, props) => ({
        ...state, payrollDataEntity: payrollDataEntityAdapter.addMany(props.response?.data, {
            ...state.payrollDataEntity,
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null,
            total: props.response?.total,
        })
    })),

    // work-item data
    on(fromActions.FetchWorkItemDataBegin, (state, props) => ({
        ...state,
        workItemDataEntity: {
            ...state.workItemDataEntity,
            isPending: true,
            error: null,
            filter: { ...state.workItemDataEntity.filter, ...props.filter },
        }
    })),
    on(fromActions.FetchWorkItemDataFail, state => ({ ...state, workItemDataEntity: { ...state.workItemDataEntity, isPending: false, error: null } })),
    on(fromActions.FetchWorkItemDataSuccess, (state, props) => ({
        ...state,
        workItemDataEntity: workItemDataEntityAdapter.addMany(props.response?.data, {
            ...state.workItemDataEntity,
            entities: {},
            ids: [],
            activeId: state.workItemDataEntity.activeId ?? null,
            isPending: false,
            error: null,
            total: props.response?.total,
        })
    })),
    on(fromActions.FetchWorkItemDataRecordBegin, (state, props) => ({ ...state, workItemDataEntity: { ...state.workItemDataEntity, activeId: props.uid } })),
    on(fromActions.FetchWorkItemDataRecordSuccess, (state, props) => ({
        ...state,
        workItemDataEntity: workItemDataEntityAdapter.addOne(props.response, { ...state.workItemDataEntity }),
    })),

    // Advance payment data
    on(fromActions.FetchAdvancePaymentDataBegin, (state, props) => ({
        ...state,
        advancePaymentDataEntity: {
            ...state.advancePaymentDataEntity,
            isPending: true,
            error: null,
            filter: { ...state.advancePaymentDataEntity.filter, ...props.filter },
        }
    })),
    on(fromActions.FetchAdvancePaymentDataFail, state => ({ ...state, advancePaymentDataEntity: { ...state.advancePaymentDataEntity, isPending: false, error: null } })),
    on(fromActions.FetchAdvancePaymentDataSucess, (state, props) => ({
        ...state,
        advancePaymentDataEntity: advancePaymentDataEntityAdapter.addMany(props?.response?.data, {
            ...state.advancePaymentDataEntity,
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null,
            total: props.response?.total,
        }),
    })),
);

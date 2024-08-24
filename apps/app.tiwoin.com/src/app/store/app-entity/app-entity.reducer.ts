import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import {
    DocumentModel,
    EmployeeModel,
    FilterList,
    FormModal,
    OrganizationModel,
    PayrollComponentModel,
    PayrollModel,
    SiteModel,
    TimesheetModel,
    UserModel,
    WorkItemModal
} from '@models';
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
    filter: FilterList;
}

interface FormSubmissionEntityState extends EntityState<FormModal> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
    filter: FilterList;
}

interface PayrollDataEntityState extends EntityState<PayrollModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
}

interface WorkItemSubmissionEntityState extends EntityState<WorkItemModal> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
    filter: FilterList;
}

interface DocumentEntityState extends EntityState<DocumentModel> {
    activeId: string | null;
    isPending: boolean;
    error: string | null;
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
export const formSubmissionEntityAdapter = createEntityAdapter<FormModal>();
export const payrollDataEntityAdapter = createEntityAdapter<PayrollModel>();
export const workItemSubmissionEntityAdapter = createEntityAdapter<WorkItemModal>();
export const documentEntityAdapter = createEntityAdapter<DocumentModel>();

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
    formSubmissionEntity: FormSubmissionEntityState;
    payrollDataEntity: PayrollDataEntityState;
    workItemSubmissionEntity: WorkItemSubmissionEntityState;
    documentEntity: DocumentEntityState;
}

const initialState: AppEntityState = {
    organizationEntity: organizationEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    employeeEntity: employeeEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    payrollEntity: payrollEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    payrollComponentEntity: payrollComponentEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    workItemEntity: workItemEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    siteEntity: siteEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    formEntity: formEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    userEntity: userEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    timesheetEntity: timesheetEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
    timesheetDataEntity: timesheetDataEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, filter: emptyFilterObject() }),
    formSubmissionEntity: formSubmissionEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, filter: emptyFilterObject() }),
    payrollDataEntity: payrollDataEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, filter: emptyFilterObject() }),
    workItemSubmissionEntity: workItemSubmissionEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null, filter: emptyFilterObject() }),
    documentEntity: documentEntityAdapter.getInitialState({ entities: {}, ids: [], activeId: null, isPending: false, error: null }),
};

export const appEntityReducer = createReducer(
    initialState,

    // ----------------------------------------------------- payroll ---------------------------------------------------------------------
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
    // timesheet data
    on(fromActions.FetchTimesheetSubmissionListBegin, (state, props) => ({
        ...state,
        timesheetDataEntity: {
            ...state.timesheetDataEntity,
            isPending: true,
            error: null,
            filter: { ...state.timesheetDataEntity.filter, ...props.filter },
        }
    })),
    on(fromActions.FetchTimesheetSubmissionListFail, state => ({ ...state, timesheetDataEntity: { ...state.timesheetDataEntity, isPending: false, error: null } })),
    on(fromActions.FetchTimesheetSubmissionListSuccess, (state, props) => ({
        ...state, timesheetDataEntity: timesheetDataEntityAdapter.addMany(props.response.data, {
            ...state.timesheetDataEntity,
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null,
        })
    })),

    // form data
    on(fromActions.FetchFormSubmissionListBegin, (state, props) => ({
        ...state,
        formSubmissionEntity: {
            ...state.formSubmissionEntity,
            isPending: true,
            error: null,
            filter: { ...state.workItemSubmissionEntity.filter, ...props.filter },
        }
    })),
    on(fromActions.FetchFormSubmissionListFail, state => ({ ...state, formSubmissionEntity: { ...state.formSubmissionEntity, isPending: false, error: null } })),
    on(fromActions.FetchFormSubmissionListSuccess, (state, props) => ({
        ...state, formSubmissionEntity: formSubmissionEntityAdapter.addMany(props.response.data, {
            ...state.formSubmissionEntity,
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        })
    })),
    on(fromActions.FetchFormSubmissionBegin, (state, props) => ({ ...state, formSubmissionEntity: { ...state.formSubmissionEntity, activeId: props.uid } })),

    // payroll data
    on(fromActions.FetchPayrollDataBegin, state => ({ ...state, payrollDataEntity: { ...state.payrollDataEntity, isPending: true, error: null } })),
    on(fromActions.FetchPayrollDataFail, state => ({ ...state, payrollDataEntity: { ...state.payrollDataEntity, isPending: false, error: null } })),
    on(fromActions.FetchPayrollDataSuccss, (state, props) => ({
        ...state, payrollDataEntity: payrollDataEntityAdapter.addMany(props.response, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        })
    })),

    // work-item data
    on(fromActions.FetchWorkItemSubmissionListBegin, (state, props) => ({
        ...state,
        workItemSubmissionEntity: {
            ...state.workItemSubmissionEntity,
            isPending: true,
            error: null,
            filter: { ...state.workItemSubmissionEntity.filter, ...props.filter },
        }
    })),
    on(fromActions.FetchWorkItemSubmissionListFail, state => ({ ...state, workItemSubmissionEntity: { ...state.workItemSubmissionEntity, isPending: false, error: null } })),
    on(fromActions.FetchWorkItemSubmissionListSuccess, (state, props) => ({
        ...state, workItemSubmissionEntity: workItemSubmissionEntityAdapter.addMany(props.response.data, {
            ...state.workItemSubmissionEntity,
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null
        })
    })),

    // document list
    on(fromActions.FetchDocumentListBegin, state => ({ ...state, documentEntity: { ...state.documentEntity, isPending: true, error: null } })),
    on(fromActions.FetchDocumentListFail, state => ({ ...state, documentEntity: { ...state.documentEntity, isPending: false, error: null } })),
    on(fromActions.FetchDocumentListSuccess, (state, props) => ({
        ...state, documentEntity: documentEntityAdapter.addMany(props.response, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null,
        })
    })),

    // organization list
    on(fromActions.FetchOrganizationListBegin, state => ({ ...state, organizationEntity: { ...state.organizationEntity, isPending: true, error: null } })),
    on(fromActions.FetchOrganizationListFail, state => ({ ...state, organizationEntity: { ...state.organizationEntity, isPending: false, error: null } })),
    on(fromActions.FetchOrganizationListSuccess, (state, props) => ({
        ...state,
        organizationEntity: organizationEntityAdapter.addMany(props.response?.data, {
            entities: {},
            ids: [],
            activeId: null,
            isPending: false,
            error: null,
        }),
    }))
);

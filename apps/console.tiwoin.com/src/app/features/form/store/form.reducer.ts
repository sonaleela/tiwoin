import { createReducer, on } from "@ngrx/store";
import { FormFieldType, FormModal } from "@models";
import { v4 as uuid } from "uuid";

import * as fromActions from "./form.actions";

export const formFeatureKey = 'form';
export interface State {
    isAddFormPending: boolean;
    addFormError: string;

    isEditFormPending: boolean;
    editFormError: string;

    activeForm: FormModal | null;
    activeFormField: FormFieldType | null;
}

const initialState: State = {
    isAddFormPending: false,
    addFormError: '',

    isEditFormPending: false,
    editFormError: '',

    activeForm: null,
    activeFormField: null,
}

export const reducer = createReducer(
    initialState,
    on(fromActions.AddFormBegin, state => ({ ...state, isAddFormPending: true, addFormError: '' })),
    on(fromActions.AddFormFail, (state, props) => ({ ...state, isAddFormPending: false, addFormError: props.error })),
    on(fromActions.AddFormSuccess, state => ({ ...state, isAddFormPending: false, addFormError: '' })),

    on(fromActions.UpdateFormBegin, state => ({ ...state, isEditFormPending: true, editFormError: '' })),
    on(fromActions.UpdateFormFail, (state, props) => ({ ...state, isEditFormPending: false, editFormError: props.error })),
    on(fromActions.UpdateFormSuccess, state => ({ ...state, isEditFormPending: false, editFormError: '' })),

    on(fromActions.SetActiveForm, (state, props) => ({ ...state, activeForm: props?.form })),
    on(fromActions.SetActiveField, (state, props) => ({ ...state, activeFormField: (props?.field as FormFieldType) })),
    on(fromActions.UnsetActiveField, (state) => ({ ...state, activeFormField: null })),
    on(fromActions.SaveField, (state, props) => {
        const fieldIndex = (state?.activeForm?.fields || [])?.findIndex(field => field?.id === props?.field?.id);
        let fields = [];
        if (fieldIndex === -1) {
            fields = state?.activeForm?.fields ? [...state?.activeForm?.fields, props.field] : [props.field];
        } else {
            fields = state?.activeForm?.fields?.map(field => field?.id === props.field?.id ? props.field : field) || [];
        }

        const activeForm: FormModal = { id: state.activeForm?.id, name: state.activeForm?.name || '', fields: fields || [] };
        return { ...state, activeFormField: null, activeForm }
    }),
    on(fromActions.DeleteField, (state, props) => {
        const fields = state?.activeForm?.fields.filter(field => field.id !== props.field.id);
        const activeForm: FormModal = { id: state.activeForm!.id, name: state.activeForm!.name, fields: fields || [] };
        return { ...state, activeForm };
    }),
    on(fromActions.CopyField, (state, props) => {
        const fields: any = [...(state?.activeForm?.fields || []), {
            ...props.field,
            id: uuid(),
            label: `${props.field.label} copy`,
        }];

        const activeForm: FormModal = { id: state.activeForm?.id, name: state.activeForm?.name || '', fields: fields || [] };
        return { ...state, activeForm };
    })
);

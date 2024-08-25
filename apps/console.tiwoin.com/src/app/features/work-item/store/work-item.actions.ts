import { createAction, props } from '@ngrx/store';
import { WorkItemModal } from '@models';

export const AddWorkItemBegin = createAction('[Work Item] Add Work Item Begin', props<{ body: any }>());
export const AddWorkItemFail = createAction('[Work Item] Add Work Item Fail', props<{ error: string }>());
export const AddWorkItemSuccess = createAction('[Work Item] Add Work Item Success', props<{ response: WorkItemModal }>());

export const EditWorkItemBegin = createAction('[Work Item] Edit Work Item Begin', props<{ body: WorkItemModal }>());
export const EditWorkItemFail = createAction('[Work Item] Edit Work Item Fail', props<{ error: string }>());
export const EditWorkItemSuccess = createAction('[Work Item] Edit Work Item Success', props<{ response: WorkItemModal }>());

export const DeleteWorkItemBegin = createAction('[Work Item] Delete Work Item Begin', props<{ id: string }>());
export const DeleteWorkItemFail = createAction('[Work Item] Delete Work Item Fail', props<{ error: string }>());
export const DeleteWorkItemSuccess = createAction('[Work Item] Delete Work Item Success', props<{ response: string }>());

export const SubmitWorkItemBegin = createAction('[Work Item] Submit Work Item Begin', props<{ body: any }>());
export const SubmitWorkItemFail = createAction('[Work Item] Submit Work Item Fail', props<{ error: string }>());
export const SubmitWorkItemSuccess = createAction('[Work Item] Submit Work Item Success', props<{ response: any }>());

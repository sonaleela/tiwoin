import { createAction, props } from '@ngrx/store';

export const WorkItemSubmissionBegin = createAction('[Work Item] Work Item Submission Begin', props<{ body: any }>());
export const WorkItemSubmissionCancel = createAction('[Work Item] Work Item Submission Cancel');
export const WorkItemSubmissionFail = createAction('[Work Item] Work Item Submission Fail', props<{ error: string }>());
export const WorkItemSubmissionSuccess = createAction('[Work Item] Work Item Submission Success', props<{ response: any }>());

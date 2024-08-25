import { createAction, props } from '@ngrx/store';

import { PostalData, SiteModel } from '@models';

export const AddSiteBegin = createAction('[Site] Add Site Begin', props<{ body: SiteModel }>());
export const AddSiteFail = createAction('[Site] Add Site Fail', props<{ error: string }>());
export const AddSiteSuccess = createAction('[Site] Add Site Success');
export const AddSiteCancel = createAction('[Site] Add Site Cancel');

export const UpdateSiteBegin = createAction('[Site] Update Site Begin', props<{ site: SiteModel }>());
export const UpdateSiteFail = createAction('[Site] Update Site Fail', props<{ error: string }>());
export const UpdateSiteSuccess = createAction('[Site] Update Site Success', props<{ site: SiteModel }>());

export const DeleteSiteBegin = createAction('[Site] Delete Site Begin', props<{ id: string }>());
export const DeleteSiteFail = createAction('[Site] Delete Site Fail', props<{ error: string }>());
export const DeleteSiteSuccess = createAction('[Site] Delete Site Success', props<{ response: any }>());

export const SetGeoFence = createAction('[Site] Set Geo Fence', props<{ geoJson: any }>());

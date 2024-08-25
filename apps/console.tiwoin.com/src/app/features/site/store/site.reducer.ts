import { createReducer, on } from '@ngrx/store';

import { PostalData } from '@models';
import * as fromActions from './site.actions';

export const siteFeatureKey = 'site';

export interface State {
    isAddSitePending: boolean;
    addSiteError: string;
    isEditSitePending: boolean;
    editSiteError: string;

    geoFence: null | any,
}
const initialState: State = {
    isAddSitePending: false,
    addSiteError: '',
    isEditSitePending: false,
    editSiteError: '',

    geoFence: null,
};

export const reducer = createReducer(
    initialState,

    on(fromActions.AddSiteBegin, (state) => ({ ...state, isAddSitePending: true, addSiteError: '', })),
    on(fromActions.AddSiteFail, (state, props) => ({ ...state, isAddSitePending: false, addSiteError: props.error, })),
    on(fromActions.AddSiteSuccess, (state) => ({ ...state, isAddSitePending: false, addSiteError: '', })),
    on(fromActions.AddSiteCancel, state => ({ ...state, isAddSitePending: false, addSiteError: '' })),

    on(fromActions.UpdateSiteBegin, state => ({ ...state, isEditSitePending: true, editSiteError: '', })),
    on(fromActions.UpdateSiteFail, (state, props) => ({ ...state, isEditSitePending: false, editSiteError: props.error, })),
    on(fromActions.UpdateSiteSuccess, state => ({ ...state, isEditSitePending: false, editSiteError: '', })),

    on(fromActions.SetGeoFence, (state, props) => ({ ...state, geoFence: props.geoJson }))
);

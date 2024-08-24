import { routerReducer, RouterReducerState, SerializedRouterStateSnapshot } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, createAction, MetaReducer } from "@ngrx/store";

import { appConfigFeatureKey, appConfigReducer, AppConfigState } from "./app-config";
import { appFeatureKey, appReducer, AppState } from "./app-state";
import { appEntityFeatureKey, appEntityReducer, AppEntityState } from './app-entity';
import { routerStoreKey } from "./app-router";

// Meta reducer
function resetStateReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        return reducer(state, action);
    }
}

export const metaReducers: MetaReducer<any>[] = [];

interface State {
    [routerStoreKey]: RouterReducerState<SerializedRouterStateSnapshot>;
    [appConfigFeatureKey]: AppConfigState;
    [appFeatureKey]: AppState;
    [appEntityFeatureKey]: AppEntityState;
}

export const reducers: ActionReducerMap<State> = {
    [routerStoreKey]: routerReducer,
    [appConfigFeatureKey]: appConfigReducer,
    [appFeatureKey]: appReducer,
    [appEntityFeatureKey]: appEntityReducer,
};

export * from './app-config';
export * from './app-router';
export * from './app-state';
export * from './app-entity';

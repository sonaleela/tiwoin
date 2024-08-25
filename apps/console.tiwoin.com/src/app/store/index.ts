import { routerReducer, RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { routerStoreKey } from './app-router';
import { appFeatureKey, AppState, appReducer } from './app-state';
import { appConfigReducer, appConfigFeatureKey, AppConfigState } from './app-config';
import { appEntityFeatureKey, appEntityReducer, AppEntityState } from './app-entity';

export interface State {
    [routerStoreKey]: RouterReducerState<SerializedRouterStateSnapshot>;
    [appFeatureKey]: AppState;
    [appConfigFeatureKey]: AppConfigState;
    [appEntityFeatureKey]: AppEntityState;
}

export const reducers: ActionReducerMap<State> = {
    [routerStoreKey]: routerReducer,
    [appFeatureKey]: appReducer,
    [appConfigFeatureKey]: appConfigReducer,
    [appEntityFeatureKey]: appEntityReducer,
};

export * from './app-config';
export * from './app-state';
export * from './app-entity';
export * from './app-router';

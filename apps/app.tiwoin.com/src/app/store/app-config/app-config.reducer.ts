import { createReducer, on } from '@ngrx/store';

import * as fromActions from './app-config.actions';
import { Config } from '@models';
import { EmployeeModel } from '@models';

export const appConfigFeatureKey = 'appConfig';

export interface AppConfigState {
    config: Config;
    appliedTheme: string;
    isConfigLoaded: boolean;

    isInitPending: boolean;
}


const initialAppConfigState: AppConfigState = {
    config: {
        name: '',
        sonaleela: {
            basePath: '',
        },
        aws: {
            cognito: {
                region: '',
                userPoolId: '',
                userPoolClientId: '',
            },
        },
        theme: {
            themeList: [],
            themeStorageKey: '',
        },
    },
    appliedTheme: '',
    isConfigLoaded: false,

    isInitPending: false,
};

export const appConfigReducer = createReducer(
    initialAppConfigState,
    on(fromActions.UserAuthenticationCheckFail, (state) => ({ ...state, isConfigLoaded: true })),
    on(fromActions.PostAuthenticationInitSuccess, (state) => ({ ...state, isConfigLoaded: true })),
    on(fromActions.LoadConfigurationFileSuccess, (state, props) => ({ ...state, config: props.config, })),
    on(fromActions.ApplyThemeBegin, (state, props) => ({ ...state, appliedTheme: props.name || '', })),
    on(fromActions.ApplyThemeFail, (state) => ({ ...state, appliedTheme: '' })),

    on(fromActions.PostAuthenticationInitBegin, state => ({ ...state, isInitPending: true })),
    on(fromActions.PostAuthenticationInitFail, state => ({ ...state, isInitPending: false })),
    on(fromActions.PostAuthenticationInitSuccess, state => ({ ...state, isInitPending: false })),
);

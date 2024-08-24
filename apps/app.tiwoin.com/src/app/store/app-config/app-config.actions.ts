import { createAction, props } from '@ngrx/store';
import { Config } from '@models';

// Application initialization lifecycle
export const InitializeApplicationBegin = createAction('[AppConfig] Initialize Application Begin');
export const InitializeApplicationComplete = createAction('[AppConfig] Initialize Application Complete');

// load conifgution file from `assets/config`
export const LoadConfigurationFileBegin = createAction('[AppConfig] Load Configuration File Begin');
export const LoadConfigurationFileFail = createAction('[AppConfig] Load Configuration File Fail');
export const LoadConfigurationFileSuccess = createAction('[AppConfig] Load Configuration File Success', props<{ config: Config }>());

// apply theme - after config file is loaded
export const ApplyThemeBegin = createAction('[AppConfig] Apply Theme Begin', props<{ name?: string }>());
export const ApplyThemeFail = createAction('[AppConfig] Apply Theme Fail');
export const ApplyThemeSuccess = createAction('[AppConfig] Apply Theme Success');

// configure amplify object - after config file is loaded
export const AWSConfigureBegin = createAction('[AppConfig] AWS Configure Begin');
export const AWSConfigureFail = createAction('[AppConfig] AWS Configure Fail');
export const AWSConfigureSuccess = createAction('[AppConfig] AWS Configure Success');

// Apply logged in user configuration
export const UserAuthenticationCheckBegin = createAction('[AppConfig] User Authentication Check Begin');
export const UserAuthenticationCheckFail = createAction('[AppConfig] User Authentication Check Fail');
export const UserAuthenticationCheckSuccess = createAction('[AppConfig] User Authentication Check Success');

export const PostAuthenticationInitBegin = createAction('[AppConfig] Post Authentication Init Begin');
export const PostAuthenticationInitFail = createAction('[AppConfig] Post Authentication Init Fail');
export const PostAuthenticationInitSuccess = createAction('[AppConfig] Post Authentication Init Success', props<{ redirect: string }>());

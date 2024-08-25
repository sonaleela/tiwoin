import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Amplify } from "aws-amplify";
import { combineLatest, of, zip } from 'rxjs';
import { Router } from '@angular/router';

import * as fromAppConfigActions from './app-config.actions';
import * as fromAppConfigSelectors from './app-config.selectors';
import * as fromAppState from '../app-state';
import * as fromAppEntity from '../app-entity';
import * as fromAppRouter from '../app-router';
import { ThemeManagerService, ConfigService, AuthenticationService } from '@services';

@Injectable()
export class AppConfigEffects {
    private actions$: Actions = inject(Actions);
    private themeManager: ThemeManagerService = inject(ThemeManagerService);
    private store: Store = inject(Store);
    private configService: ConfigService = inject(ConfigService);
    private authenticationService: AuthenticationService = inject(AuthenticationService);
    private router: Router = inject(Router);
    /**
     * Initalize angular application
     * Dispatch this action in `APP_INITIALIZER` provider
     */
    initializeApplicationBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppConfigActions.InitializeApplicationBegin),
        map((_) => fromAppConfigActions.LoadConfigurationFileBegin()),
    ));

    /**
     * Load configuration file from `assets/config` folder
     */
    loadConfigurationFileBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppConfigActions.LoadConfigurationFileBegin),
        exhaustMap((_) => this.configService.getConfig()),
        map((config) => fromAppConfigActions.LoadConfigurationFileSuccess({ config })),
        catchError((error, caught) => {
            this.store.dispatch(fromAppConfigActions.LoadConfigurationFileFail());
            return caught;
        }),
    ));

    /**
     * Configuraiton file loaded, now dispatch `Apply theme` and `AWS Config` actions
     */
    loadConfigurationFileSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppConfigActions.LoadConfigurationFileSuccess),
        mergeMap((_) => {
            return [
                fromAppConfigActions.ApplyThemeBegin({}),
                fromAppConfigActions.AWSConfigureBegin(),
                fromAppState.DeviceGeoLocationBegin(),
            ];
        }),
    ));

    /**
     * Apply theme to application based on Configuration file or localstorage
     */
    applyThemeBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppConfigActions.ApplyThemeBegin),
        concatLatestFrom(() => this.store.select(fromAppConfigSelectors.selectConfig)),
        map(([payload, config]) => {
            this.themeManager.themeStorageKey = config.theme.themeStorageKey;
            this.themeManager.themeList = config.theme.themeList;
            this.themeManager.setTheme(payload.name);
            return fromAppConfigActions.ApplyThemeSuccess();
        }),
        catchError((error, caught) => {
            this.store.dispatch(fromAppConfigActions.ApplyThemeFail());
            return caught;
        }),
    ));

    /**
     * Apply amplify conifguration based on configuration file
     */
    awsConfigureBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppConfigActions.AWSConfigureBegin),
        concatLatestFrom(() => this.store.select(fromAppConfigSelectors.selectConfig)),
        tap(([_, config]) => {
            Amplify.configure({ Auth: { Cognito: config.aws.cognito } });
        }),
        map((_) => fromAppConfigActions.AWSConfigureSuccess()),
        catchError((error, caught) => {
            this.store.dispatch(fromAppConfigActions.AWSConfigureFail());
            return caught;
        }),
    ));

    /**
     * Initialization completes when `Apply theme`, `AWS configure` completes
     */
    initializeApplicationComplete$ = createEffect(() =>
        combineLatest([
            this.actions$.pipe(ofType(fromAppConfigActions.ApplyThemeSuccess)),
            this.actions$.pipe(ofType(fromAppConfigActions.AWSConfigureSuccess)),
        ]).pipe(
            mergeMap((_) => [
                fromAppConfigActions.InitializeApplicationComplete(),
                fromAppConfigActions.UserAuthenticationCheckBegin()
            ]),
        ),
    );

    /**
     * After `Application initialization` Check if user is looged in
     */
    userAuthenticationCheckBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppConfigActions.UserAuthenticationCheckBegin),
        exhaustMap((_) => this.authenticationService.getUser()),
        map((user) => {
            return fromAppConfigActions.UserAuthenticationCheckSuccess();
        }),
        catchError((error, caught) => {
            this.store.dispatch(fromAppConfigActions.UserAuthenticationCheckFail());
            return caught;
        }),
    ));

    /**
     * Dispatch `post authentication` action
     */
    userAuthenticationCheckSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppConfigActions.UserAuthenticationCheckSuccess),
        map((_) => fromAppConfigActions.PostAuthenticationInitBegin()),
    ));

    /**
     * Start `post authentication init` by dispatching `fetch org list` and `fetch profile` actions
     */
    postAuthenticationInitBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppConfigActions.PostAuthenticationInitBegin),
        mergeMap((_) => [fromAppEntity.FetchOrganizationListBegin(), fromAppState.ProfileRequestBegin()]),
    ));

    /**
     * If fetch orgs and profile success then complete post authentication init
     */
    postAuthenticationInitComplete$ = createEffect(() =>
        zip(
            this.actions$.pipe(ofType(fromAppEntity.FetchOrganizationListSuccess)),
            this.actions$.pipe(ofType(fromAppState.ProfileRequestSuccess)),
        ).pipe(
            mergeMap(([organizationListResponse, profileResponse]) => {
                const forbiddenPaths = ['/signin', '/signup', '/organization-list'];
                const location = window.location.pathname;
                const organizationList = organizationListResponse.response?.data || [];

                if (!organizationList.length) return [fromAppConfigActions.PostAuthenticationInitSuccess({ redirect: '/onboard-organization' })];

                const acceptedOrganizationUserList = organizationList.filter(organizationUser => organizationUser.isAccepted !== false);

                // If default defaultOrganizationId exist on user then pick that organization from organizationList
                const defaultOrganizationId = profileResponse.profile?.defaultOrganization;
                const defaultOrganization = acceptedOrganizationUserList
                    ?.map(organizationUser => organizationUser.organization)
                    ?.find(organization => defaultOrganizationId === organization.id);

                if (defaultOrganization) {
                    const redirect = forbiddenPaths.includes(location) ? '/' : null;
                    return [
                        fromAppState.SetAppOrganization({ organization: defaultOrganization }),
                        fromAppConfigActions.PostAuthenticationInitSuccess({ redirect })
                    ];
                }

                // Try to pick organization where user is 'OWNER'
                const ownedOrganization = acceptedOrganizationUserList
                    ?.find(organizationUser => organizationUser.role === 'OWNER')?.[0];
                if (ownedOrganization) {
                    const redirect = forbiddenPaths.includes(location) ? '/' : null;
                    return [
                        fromAppState.SetAppOrganization({ organization: ownedOrganization }),
                        fromAppConfigActions.PostAuthenticationInitSuccess({ redirect })
                    ];
                }

                return [fromAppConfigActions.PostAuthenticationInitSuccess({ redirect: '/organization-list' })];
            }),
        ),
    );

    postAuthenticationInitSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppConfigActions.PostAuthenticationInitSuccess),
        tap((payload) => {
            if (payload.redirect) this.router.navigate([payload.redirect]);
        }),
    ), { dispatch: false });
}

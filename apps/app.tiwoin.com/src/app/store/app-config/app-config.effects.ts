import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store, createAction } from "@ngrx/store";
import { Amplify } from "aws-amplify";
import { combineLatest, of, zip } from "rxjs";
import { catchError, exhaustMap, map, mergeMap, tap, withLatestFrom } from "rxjs/operators";

import * as fromActions from "./app-config.actions";
import * as fromAppConfigSelectors from "./app-config.selectors";
import * as fromAppEntity from "../app-entity";
import * as fromAppState from "../app-state";
import { AuthenticationService, ConfigService, ThemeManagerService } from "@services";

@Injectable()
export class AppConfigEffects {
    private actions$: Actions = inject(Actions);
    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private configService: ConfigService = inject(ConfigService);
    private themeManager: ThemeManagerService = inject(ThemeManagerService);
    private authenticationService: AuthenticationService = inject(AuthenticationService);

    /**
     * Initalize angular application
     * Dispatch this action in `APP_INITIALIZER` provider
     */
    initializeApplicationBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.InitializeApplicationBegin),
        map(_ => fromActions.LoadConfigurationFileBegin()),
    ));

    /**
     * Load configuration file from `assets/config` folder
     */
    loadConfigurationFileBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.LoadConfigurationFileBegin),
        exhaustMap((_) => this.configService.getConfig()),
        map((config) => fromActions.LoadConfigurationFileSuccess({ config })),
        catchError((error, caught) => {
            console.log('config error', error);
            this.store.dispatch(fromActions.LoadConfigurationFileFail());
            return caught;
        }),
    ));

    /**
     * Configuraiton file loaded, now dispatch `Apply theme` and `AWS Config` actions
     */
    loadConfigurationFileSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.LoadConfigurationFileSuccess),
        mergeMap((_) => {
            return [
                fromActions.ApplyThemeBegin({}),
                fromActions.AWSConfigureBegin(),
                fromAppState.DeviceGeoLocationBegin(),
            ];
        }),
    ));

    /**
     * Apply theme to application based on Configuration file or localstorage
     */
    applyThemeBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.ApplyThemeBegin),
        concatLatestFrom(() => this.store.select(fromAppConfigSelectors.selectConfig)),
        map(([payload, config]) => {
            this.themeManager.themeStorageKey = config.theme.themeStorageKey;
            this.themeManager.themeList = config.theme.themeList;
            this.themeManager.setTheme(payload.name);
            return fromActions.ApplyThemeSuccess();
        }),
        catchError((error, caught) => {
            console.log({ error });
            this.store.dispatch(fromActions.ApplyThemeFail());
            return caught;
        }),
    ));

    /**
     * Apply amplify conifguration based on configuration file
     */
    awsConfigureBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.AWSConfigureBegin),
            concatLatestFrom(() => this.store.select(fromAppConfigSelectors.selectConfig)),
            map(([_, config]) => {
                Amplify.configure({ Auth: { Cognito: config.aws.cognito } });

                return fromActions.AWSConfigureSuccess();
            }),
            catchError((error, caught) => {
                console.log({ error });
                this.store.dispatch(fromActions.AWSConfigureFail());
                return caught;
            }),
        ),
    );

    /**
     * Initialization completes when `Apply theme`, `AWS configure` completes
     */
    initializeApplicationComplete$ = createEffect(() =>
        combineLatest([
            this.actions$.pipe(ofType(fromActions.ApplyThemeSuccess)),
            this.actions$.pipe(ofType(fromActions.AWSConfigureSuccess)),
        ]).pipe(
            mergeMap((_) => [
                fromActions.InitializeApplicationComplete(),
                fromActions.UserAuthenticationCheckBegin()
            ]),
        ),
    );

    /**
     * After `Application initialization` Check if user is looged in
     */
    userAuthenticationCheckBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UserAuthenticationCheckBegin),
        exhaustMap(_ => this.authenticationService.getUser()),
        map(_ => fromActions.UserAuthenticationCheckSuccess()),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UserAuthenticationCheckFail());
            return caught;
        }),
    ));


    /**
     * Dispatch `post authentication` action
     */
    userAuthenticationCheckSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UserAuthenticationCheckSuccess),
        map((_) => fromActions.PostAuthenticationInitBegin()),
    ));

    /**
     * Start `post authentication init` by dispatching `fetch org list` and `fetch profile` actions
     */
    postAuthenticationInitBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.PostAuthenticationInitBegin),
        mergeMap((_) => [fromAppEntity.FetchOrganizationListBegin(), fromAppState.FetchProfileBegin(),]),
    ));

    /**
     * If fetch orgs and profile success then complete post authentication init
     */
    fetchOrgAndProfileSuccess$ = createEffect(() =>
        // TODO: once we call `set default organization` we recall the fetch organization
        // which cause this action to trigger only for profile, since FetchOrganizationListSuccess
        // already happend.
        zip(
            this.actions$.pipe(ofType(fromAppEntity.FetchOrganizationListSuccess)),
            this.actions$.pipe(ofType(fromAppState.FetchProfileSuccess)),
        ).pipe(
            mergeMap(([organizationListResponse, profileResponse]) => {
                const forbiddenPaths = ['/signin', '/signup', '/organization/list'];
                const location = window.location.pathname;
                const organizationList = organizationListResponse
                    .response
                    ?.data
                    ?.filter(organizationUser => organizationUser.isEmployee && organizationUser.employeeId) || [];

                if (!organizationList.length) return [fromActions.PostAuthenticationInitSuccess({ redirect: '/organization/empty' })];

                const acceptedOrganizationUserList = organizationList.filter(organizationUser => organizationUser.isAccepted !== false);
                // If default defaultOrganizationId exist on user then pick that organization from organizationList
                const defaultOrganizationId = profileResponse.profile?.defaultOrganization;
                const defaultOrganizationUser = acceptedOrganizationUserList
                    ?.find(organizationUser => defaultOrganizationId === organizationUser.organization?.id);
                if (defaultOrganizationUser) {
                    const redirect = forbiddenPaths.includes(location) ? '/' : location;
                    return [
                        fromAppState.SetAppOrganization({ organization: { ...defaultOrganizationUser?.organization, employeeId: defaultOrganizationUser.employeeId } }),
                        fromActions.PostAuthenticationInitSuccess({ redirect }),
                    ];
                }

                // Try to pick organization where user is 'OWNER'
                const ownedOrganizationUser = acceptedOrganizationUserList
                    ?.find(organizationUser => organizationUser.role === 'OWNER')?.[0];
                if (ownedOrganizationUser) {
                    const redirect = forbiddenPaths.includes(location) ? '/' : location;
                    return [
                        fromAppState.SetAppOrganization({ organization: { ...ownedOrganizationUser?.organization, employeeId: ownedOrganizationUser.employeeId } }),
                        fromActions.PostAuthenticationInitSuccess({ redirect }),
                    ];
                }

                return [fromActions.PostAuthenticationInitSuccess({ redirect: '/organization/list' })];
            }),
        ),
    );

    // TODO: add higher level full page loading icons for organization switching
    // this loading will stay till employee profile and sites are not loaded
    setAppOrganization$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppState.SetAppOrganization),
        mergeMap(_ => ([
            fromAppState.FetchEmployeeProfileBegin(),
            fromAppEntity.FetchSiteListBegin(),
        ])),
    ));

    /**
     * Navigate after login and successful config loads
     */
    postAuthenticationInitSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.PostAuthenticationInitSuccess),
        map((payload) => {
            return this.router.navigate([payload.redirect]);
        }),
    ), { dispatch: false });
}
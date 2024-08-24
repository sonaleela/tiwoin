import { NgModule, isDevMode } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import { DialogModule } from '@angular/cdk/dialog';
import { httpInterceptorProvider } from '@core';
import { provideHttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';

import { LayoutModule } from './layout';
import { appInitializerProvider } from "./init";
import { AppRoutingModule } from './app.routing';
import { AuthenticationModule } from "./authentication";
import { AppComponent, HomePageComponent } from './components';
import { reducers, AppConfigEffects, RouterEffects, AppEntityEffects, AppStateEffects, metaReducers } from "@store";
import { FormModule, ProfileModule, SettingsModule, SiteModule, TimesheetModule, WorkItemModule, OrganizationModule } from "./features";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DialogModule,
        SluiIconModule.forRoot({ 'icon-path': './assets/icons' }),
        SluiButtonModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([RouterEffects, AppConfigEffects, AppStateEffects, AppEntityEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
            connectInZone: true,
        }),
        StoreRouterConnectingModule.forRoot({
            navigationActionTiming: NavigationActionTiming.PostActivation,
        }),
        LayoutModule,
        AuthenticationModule,
        FormModule,
        ProfileModule,
        SettingsModule,
        SiteModule,
        TimesheetModule,
        WorkItemModule,
        OrganizationModule,
        AppRoutingModule,
        // ServiceWorkerModule.register('ngsw-worker.js', {
        //     enabled: true, // !isDevMode(),
        //     // Register the ServiceWorker as soon as the application is stable
        //     // or after 30 seconds (whichever comes first).
        //     registrationStrategy: 'registerWhenStable:30000'
        // }),
    ],
    declarations: [
        AppComponent,
        HomePageComponent,
    ],
    providers: [
        appInitializerProvider,
        httpInterceptorProvider,
        provideHttpClient(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

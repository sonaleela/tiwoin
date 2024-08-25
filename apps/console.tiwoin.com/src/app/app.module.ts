import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import { register } from 'swiper/element/bundle';

import { appInitializerProvider } from './init';
import { AppRoutingModule } from './app.routing';
import { AuthenticationModule } from './authentication';
import {
    EmployeeModule,
    OnboardingModule,
    PayrollModule,
    ProfileModule,
    WorkItemModule,
    UserModule,
    SiteModule,
    FormModule,
    TimesheetModule,
    DataModule,
    DashboardModule,
} from './features';
import { reducers, AppEffects, AppConfigEffects, AppEntityEffects, RouterEffects } from '@store';
import { httpInterceptorProvider } from '@core';
import { AppComponent, SampleComponent } from './components';
import { LayoutModule } from './layout';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        SluiIconModule.forRoot({ 'icon-path': './assets/icons' }),
        SluiButtonModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([RouterEffects, AppConfigEffects, AppEffects, AppEntityEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
            connectInZone: true,
        }),
        StoreRouterConnectingModule.forRoot({
            navigationActionTiming: NavigationActionTiming.PostActivation,
        }),
        LayoutModule,
        DashboardModule,
        AuthenticationModule,
        OnboardingModule,
        EmployeeModule,
        PayrollModule,
        ProfileModule,
        WorkItemModule,
        UserModule,
        SiteModule,
        FormModule,
        TimesheetModule,
        DataModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        SampleComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        appInitializerProvider,
        httpInterceptorProvider,
    ],
})
export class AppModule {
    constructor() {
        register();
    }
}

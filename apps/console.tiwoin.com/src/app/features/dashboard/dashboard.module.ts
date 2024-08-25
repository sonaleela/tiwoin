import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutType } from '@models';
import { authenticationGuard } from '@core';
import { DashboardPageComponent } from "./pages";
import { DashboardControllerComponent } from "./controllers";
import { DashboardComponent } from "./components";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: DashboardPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.SIDENAV },
        }]),
    ],
    declarations: [
        DashboardPageComponent,
        DashboardControllerComponent,
        DashboardComponent,
    ],
})
export class DashboardModule { }

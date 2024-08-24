import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from '@core';

import { LayoutType } from '@models';
import { HomePageComponent } from './components';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        canActivate: [authenticationGuard],
        data: { layout: LayoutType.BOTTOMNAV },
    },
    { path: '**', redirectTo: '/?error=404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

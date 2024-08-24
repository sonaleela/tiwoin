import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SluiIconModule } from '@sonaleela/ui';

import { LayoutType } from '@models';
import { authenticationGuard } from '@core';
import { SiteListPageComponent } from './pages';
import { SiteListComponent } from './components';
import { SiteListControllerComponent } from './controllers';

@NgModule({
    imports: [
        CommonModule,
        SluiIconModule,
        RouterModule.forChild([{
            path: 'site',
            component: SiteListPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.SIDENAV }
        }])
    ],
    declarations: [
        SiteListPageComponent,
        SiteListControllerComponent,
        SiteListComponent
    ],
})
export class SiteModule { }

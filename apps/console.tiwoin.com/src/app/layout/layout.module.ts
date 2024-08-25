import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import {
    LayoutMatcherComponent,
    CompanyNavComponent,
    SideNavComponent,
    LayoutSidenavComponent,
    LayoutEmptyComponent,
    SideNavMiniComponent,
} from './components';

@NgModule({
    imports: [
        CommonModule,
        SluiButtonModule,
        SluiIconModule,
        RouterModule
    ],
    declarations: [
        LayoutMatcherComponent,
        SideNavComponent,
        CompanyNavComponent,
        LayoutSidenavComponent,
        LayoutEmptyComponent,
        SideNavMiniComponent
    ],
    exports: [LayoutMatcherComponent],
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from "@angular/material/sidenav";
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
    CdkMenu,
    CdkMenuTrigger,
} from '@angular/cdk/menu';

import { LoadingModule } from '@shared';
import {
    LayoutMatcherComponent,
    LayoutEmptyComponent,
    SidenavComponent,
    LayoutSidenavComponent,
    SiteSelectionListComponent,
    LayoutBottomNavComponent,
    BottomnavComponent,
} from './components';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSidenavModule,
        SluiButtonModule,
        SluiIconModule,
        RouterModule,
        LoadingModule,
        CdkMenu,
        CdkMenuTrigger,
    ],
    declarations: [
        LayoutMatcherComponent,
        LayoutEmptyComponent,
        SidenavComponent,
        LayoutSidenavComponent,
        SiteSelectionListComponent,
        LayoutBottomNavComponent,
        BottomnavComponent,
    ],
    exports: [LayoutMatcherComponent]
})
export class LayoutModule { }

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import { SluiButtonModule, SluiIconModule } from '@sonaleela/ui';

import { authenticationGuard } from '@core';
import { LayoutType } from '@models';
import { userFeatureKey, reducer, UserEffects } from './store';
import { ListUserPageComponent, InviteUserPageComponent, EditInviteUserPageComponent } from './pages';
import { UserListControllerComponent, InviteUserControllerComponent, EditInviteUserControllerComponent } from './controller';
import { UserListCardComponent, UserListHeaderComponent, InviteUserFormComponent, EditInviteUserFormComponent } from './components';
import { LoadingModule } from '@shared';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CdkTableModule,
        CdkMenuModule,
        SluiButtonModule,
        SluiIconModule,
        LoadingModule,
        StoreModule.forFeature(userFeatureKey, reducer),
        EffectsModule.forFeature([UserEffects]),
        RouterModule.forChild([
            { path: 'user', component: ListUserPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
            { path: 'user/invite', component: InviteUserPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
            { path: 'user/invite/:uid', component: EditInviteUserPageComponent, canActivate: [authenticationGuard], data: { layout: LayoutType.SIDENAV } },
        ]),
    ],
    declarations: [
        ListUserPageComponent,
        UserListControllerComponent,
        UserListCardComponent,
        UserListHeaderComponent,
        InviteUserPageComponent,
        InviteUserControllerComponent,
        InviteUserFormComponent,
        EditInviteUserPageComponent,
        EditInviteUserControllerComponent,
        EditInviteUserFormComponent
    ],
})
export class UserModule { }

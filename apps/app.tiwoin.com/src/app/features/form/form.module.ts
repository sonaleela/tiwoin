import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SluiButtonModule, SluiIconModule, SluiDynamicFormModule } from "@sonaleela/ui";
import { EffectsModule } from '@ngrx/effects';

import { authenticationGuard } from '@core';
import { LoadingModule, DateFilterBarComponent } from '@shared';
import { LayoutType } from '@models';
import { FormListPageComponent, FormSubmissionListPageComponent, FormPageComponent, FormViewPageComponent } from './pages';
import { FormListControllerComponent, FormSubmissionListControllerComponent, FormControllerComponent, FormViewControllerComponent } from './controllers';
import { FormListComponent, FormSubmissionListComponent, FormComponent, FormViewComponent } from './components';
import { formFeatureKey, reducer, FormEffects } from "./store";
import { StorageService } from "@services";

@NgModule({
    imports: [
        CommonModule,
        SluiIconModule,
        SluiButtonModule,
        ReactiveFormsModule,
        SluiDynamicFormModule.forRoot({ storageService: StorageService }),
        LoadingModule,
        DateFilterBarComponent,
        StoreModule.forFeature(formFeatureKey, reducer),
        EffectsModule.forFeature([FormEffects]),
        RouterModule.forChild([{
            path: 'form',
            component: FormSubmissionListPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY },
        }, {
            path: 'form/list',
            component: FormListPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.BOTTOMNAV },
        }, {
            path: 'form/view/:uid',
            component: FormViewPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY },
        }, {
            path: 'form/:uid',
            component: FormPageComponent,
            canActivate: [authenticationGuard],
            data: { layout: LayoutType.EMPTY },
        }]),
    ],
    declarations: [
        FormListPageComponent,
        FormListControllerComponent,
        FormListComponent,
        FormSubmissionListPageComponent,
        FormSubmissionListControllerComponent,
        FormSubmissionListComponent,
        FormPageComponent,
        FormControllerComponent,
        FormComponent,
        FormViewPageComponent,
        FormViewControllerComponent,
        FormViewComponent,
    ],
})
export class FormModule { }

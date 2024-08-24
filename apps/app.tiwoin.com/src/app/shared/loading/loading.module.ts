import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsLoadingDirective } from './is-loading.directive';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        IsLoadingDirective,
        LoaderComponent
    ],
    exports: [
        IsLoadingDirective,
        LoaderComponent,
    ]
})
export class LoadingModule { }

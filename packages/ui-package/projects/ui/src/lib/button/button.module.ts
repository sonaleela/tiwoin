import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent, ButtonIcon, ActionButtonComponent, ActionButtonIcon, LoaderComponent } from './components';
import { ButtonLoaderDirective } from './directives';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ButtonComponent,
        ButtonIcon,
        ActionButtonComponent,
        ActionButtonIcon,
        LoaderComponent,
        ButtonLoaderDirective,
    ],
    exports: [
        ButtonComponent,
        ActionButtonComponent,
        ButtonLoaderDirective,
    ]
})
export class SluiButtonModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SonaleelaButtonComponent, SonaleelaButtonIcon } from './sonaleela-button';
import { SonaleelaActionButton } from './sonaleela-action-button';
import { LoadingButton, LoadingButtonIndicator } from './loading-button';

@NgModule({
    imports: [CommonModule],
    declarations: [SonaleelaButtonComponent, SonaleelaActionButton, SonaleelaButtonIcon, LoadingButton, LoadingButtonIndicator],
    exports: [SonaleelaButtonComponent, SonaleelaActionButton, SonaleelaButtonIcon, LoadingButton, LoadingButtonIndicator],
})
export class SonaleelaButtonModule {}

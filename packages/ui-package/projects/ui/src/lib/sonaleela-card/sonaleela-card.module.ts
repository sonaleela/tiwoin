import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    SonaleelaSelectionCardComponent,
    SonaleelaSelectionCardIconDirective,
    SonaleelaSelectionCardTitleComponent,
    SonaleelaSelectionCardControlComponent,
} from './sonaleela-selection-card';

@NgModule({
    imports: [CommonModule],
    declarations: [
        SonaleelaSelectionCardComponent,
        SonaleelaSelectionCardIconDirective,
        SonaleelaSelectionCardTitleComponent,
        SonaleelaSelectionCardControlComponent,
    ],
    exports: [
        SonaleelaSelectionCardComponent,
        SonaleelaSelectionCardIconDirective,
        SonaleelaSelectionCardTitleComponent,
        SonaleelaSelectionCardControlComponent,
    ],
})
export class SonaleelaCardModule {}

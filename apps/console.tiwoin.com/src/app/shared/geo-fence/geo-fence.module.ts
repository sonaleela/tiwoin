import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeoFenceDirective } from './geo-fence.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GeoFenceDirective
    ],
    exports: [
        GeoFenceDirective
    ]
})
export class GeoFenceModule { }

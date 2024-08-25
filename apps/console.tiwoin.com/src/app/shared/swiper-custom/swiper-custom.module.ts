import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperOptionDirective } from './swiper-option.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SwiperOptionDirective
    ],
    exports: [
        SwiperOptionDirective,
    ]
})
export class SwiperCustomModule { }

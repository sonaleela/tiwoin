import { Directive, ElementRef, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Directive({
    selector: '[sonaleelaSwiperOption]'
})
export class SwiperOptionDirective {
    @Input() set sonaleelaSwiperOption(options: SwiperOptions) {
        if (!options) return;

        Object.assign(this.elementRef.nativeElement, options);

        this.elementRef.nativeElement.initialize()
    }

    constructor(private elementRef: ElementRef) { }
}

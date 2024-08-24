import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { LoaderComponent } from "../components";

@Directive({
    selector: '[isLoading]'
})
export class ButtonLoaderDirective {
    width: number = 0;

    @Input() set isLoading(isLoading: boolean | null) {
        this.vcr.clear();
        if (isLoading) {
            const loadingButtonRef = this.vcr.createComponent(LoaderComponent);
            loadingButtonRef.instance.width = `${this.width}` || 'auto';
        } else {
            const view = this.vcr.createEmbeddedView(this.templateRef);
            const element = (<HTMLElement[]>view.rootNodes)[0];
            const iconElement = element.querySelector('slui-icon');
            this.width = iconElement ? element.offsetWidth + 24 : element.offsetWidth;
        }
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private vcr: ViewContainerRef,
    ) { }
}

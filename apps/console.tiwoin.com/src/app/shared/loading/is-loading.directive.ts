import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoaderComponent } from './loader';

@Directive({
    selector: '[isSpinner]'
})
export class IsLoadingDirective {
    @Input() set isSpinner(isLoading: boolean | null) {
        this.vcr.clear();
        if (isLoading) {
            this.vcr.createComponent(LoaderComponent);
        }
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private vcr: ViewContainerRef,
    ) { }
}

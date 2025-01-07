import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoaderComponent } from './loader';

@Directive({
    selector: '[isSpinner]',
    standalone: false
})
export class IsLoadingDirective {
    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
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

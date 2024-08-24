import { Component, ComponentFactoryResolver, Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'lib-lading-button',
    template: '<div class="loader"></div>',
    styles: [
        `
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `,
        `
            .loader {
                border: 2px solid var(--sonaleela-color-gray-transparent-200);
                border-top: 2px solid var(--sonaleela-color-blue-500);
                border-radius: 50%;
                width: 32px;
                height: 32px;
                animation: spin 1s linear infinite;
            }
        `,
        `
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `,
    ],
})
export class LoadingButton {
    private _width = 'auto';
    @Input() set width(width: string) {
        this._width = width;
        if (width && this.elementRef.nativeElement) {
            (<HTMLElement>this.elementRef.nativeElement).style.width = `${width}px`;
        } else if (this.elementRef.nativeElement) {
            (<HTMLElement>this.elementRef.nativeElement).style.width = `auto`;
        }
    }

    constructor(private elementRef: ElementRef) {}
}

@Directive({ selector: '[isButtonLoading]' })
export class LoadingButtonIndicator {
    buttonWidth: string = 'auto';
    private _isButtonLoading: boolean | null = false;
    @Input() set isButtonLoading(isLoading: boolean | null) {
        this._isButtonLoading = isLoading;
        this.vcr.clear();
        if (isLoading) {
            const componentFactory = this.cfr.resolveComponentFactory(LoadingButton);
            const loadingButtonRef = this.vcr.createComponent(componentFactory);
            loadingButtonRef.instance.width = this.buttonWidth;
        } else {
            const view = this.vcr.createEmbeddedView(this.templateRef);
            this.buttonWidth = `${(<HTMLElement[]>view.rootNodes)[0].offsetWidth}`;
        }
    }

    constructor(private templateRef: TemplateRef<any>, private vcr: ViewContainerRef, private cfr: ComponentFactoryResolver) {}
}

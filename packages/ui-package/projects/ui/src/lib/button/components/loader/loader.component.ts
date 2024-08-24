import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'slui-loader',
    template: `<div class="loader"></div>`,
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
    private _width = 'auto';
    @Input() set width(width: string) {
        this._width = width;
        if (width && this.elementRef.nativeElement) {
            (<HTMLElement>this.elementRef.nativeElement).style.width = `${width}px`;
        } else if (this.elementRef.nativeElement) {
            (<HTMLElement>this.elementRef.nativeElement).style.width = `auto`;
        }
    }

    constructor(private elementRef: ElementRef) { }
}

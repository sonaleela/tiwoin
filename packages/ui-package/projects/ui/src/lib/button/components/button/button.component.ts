import { ChangeDetectionStrategy, Component, Directive, ElementRef, HostBinding, Input } from '@angular/core';

type ButtonType = 'cta' | 'primary' | 'secondary' | 'negative';

@Directive({
    selector: '[buttonIcon]',
})
export class ButtonIcon {
    @Input() set buttonIcon(element: HTMLSpanElement | null) {
        if (!element) return;

        // Set icon node margin if button has text too
        if (element.childNodes.length && this.getHostElement().childNodes.length) {
            this.getHostElement().style.marginRight = '12px';
        }
        // Set icon node size only if icon exist
        if (this.getHostElement().childNodes.length) {
            this.getHostElement().classList.add('icon-node');
        }
    }
    constructor(private elementRef: ElementRef) { }

    getHostElement() {
        return this.elementRef.nativeElement as HTMLElement;
    }
}

@Component({
    selector: '[slui-button]',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'primary',
        '[class.disabled]': 'getHostElement().disabled'
    }
})
export class ButtonComponent {
    private _appearance: ButtonType = 'primary';
    @Input() set appearance(appearance: ButtonType) {
        if (!appearance) return;
        this._appearance = appearance;
        this.getHostElement().classList.remove('primary');
        this.getHostElement().classList.add(appearance);
    }
    get appearance() { return this._appearance; }

    @Input() set silent(_: any) {
        if (this.appearance === 'secondary') return;
        this.getHostElement().classList.add('silent');
    }

    constructor(private elementRef: ElementRef) { }

    getHostElement(param?: string) {
        return this.elementRef.nativeElement as HTMLElement;
    }
}

import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[actionButtonIcon]',
})
export class ActionButtonIcon {
    @Input() set actionButtonIcon(element: HTMLSpanElement | null) {
        if (!element) return;

        // Set icon node margin if button has text too
        if (element.childNodes.length && this.getHostElement().childNodes.length) {
            this.getHostElement().style.marginRight = '8px';
        }
        // Set icon node size if icon exist
        if (this.getHostElement().childNodes.length) {
            this.getHostElement().classList.add('icon-node');
        }
        // Reduce margin for icon only button
        if (this.getHostElement().childNodes.length && !element.childNodes.length) {
            this.getHostElement().parentElement?.classList.add('icon-only');
        }
    }
    constructor(private elementRef: ElementRef) { }

    getHostElement() {
        return this.elementRef.nativeElement as HTMLElement;
    }
}

@Component({
    selector: '[slui-action-button]',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'standard'
    }
})
export class ActionButtonComponent {
    @Input() set emphasis(emphasis: any) {
        this.getHostElement().classList.remove('standard');
        this.getHostElement().classList.add('emphasis');
    }

    @Input() set silent(silent: any) {
        this.getHostElement().classList.add('silent');
    }

    constructor(private elementRef: ElementRef) { }

    getHostElement() {
        return this.elementRef.nativeElement as HTMLElement;
    }
}

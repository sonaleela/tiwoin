import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    TemplateRef,
    ViewChild,
} from '@angular/core';

const SONALEELA_BUTTON_TYPE_MAP: { [key: string]: string } = {
    cta: 'sonaleela-button-cta',
    primary: 'sonaleela-button-primary',
    primarysilent: 'sonaleela-button-primary-silent',
    warning: 'sonaleela-button-warning',
    warningsilent: 'sonaleela-button-warning-silent',
};

@Directive({ selector: 'slui-icon' })
export class SonaleelaButtonIcon {
    @HostBinding('class.sonaleela-button-icon') icon = true;
}

@Component({
    selector: 'slui-button, [sluiButton]',
    templateUrl: './sonaleela-button.html',
    styleUrls: ['./sonaleela-button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonaleelaButtonComponent implements AfterViewInit {
    @Input() libSonaleelaButton: string = '';
    @Input() silent: string = '';
    private _isLoading = false;
    @Input() set isLoading(loading: boolean) {
        this._isLoading = loading;
        this.disabled = !!loading;
    }
    get isLoading() {
        return this._isLoading;
    }
    private _disabled = false;
    @Input() set disabled(disable: string | boolean) {
        this._disabled = coerceBooleanProperty(disable);

        if (!this.getHostElement()) return;
        this.getHostElement().disabled = this._disabled;
    }

    @HostBinding('class.sonaleela-button') sonaleelaButton = true;
    @ViewChild('textNode') textNode: ElementRef<HTMLSpanElement> | undefined;
    @ViewChild('iconNode') iconNode: ElementRef<HTMLSpanElement> | undefined;
    @ContentChild(SonaleelaButtonIcon) icon: SonaleelaButtonIcon | undefined;

    constructor(private elementRef: ElementRef) {
        const buttonType = this.getButtonType() || 'primary';
        const silent = this.getIsButtonSilent() && buttonType !== 'cta' ? 'silent' : '';

        this.setButtonTypeClass(buttonType + silent);
    }

    ngAfterViewInit() {
        if (this.textNode?.nativeElement?.childNodes && this.textNode?.nativeElement?.childNodes.length && this.iconNode && this.icon) {
            this.iconNode.nativeElement.style.marginRight = '8px';
        }
    }

    getHostElement() {
        return this.elementRef.nativeElement as HTMLButtonElement;
    }

    getButtonType() {
        return this.getHostElement().getAttribute('libsonaleelabutton');
    }

    getIsButtonSilent() {
        return this.getHostElement().hasAttribute('silent');
    }

    setButtonTypeClass(type: string) {
        if (type in SONALEELA_BUTTON_TYPE_MAP) {
            this.getHostElement().classList.add(SONALEELA_BUTTON_TYPE_MAP[type]);
        }
    }
}

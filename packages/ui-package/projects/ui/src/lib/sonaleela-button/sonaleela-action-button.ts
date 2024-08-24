import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    ViewChild,
} from '@angular/core';
import { SonaleelaButtonIcon } from './sonaleela-button';

const SONALEELA_BUTTON_ACTION_TYPE_MAP: { [key: string]: string } = {
    normal: 'sonaleela-action-button-normal',
    normalsilent: 'sonaleela-action-button-normal-silent',
    emphasied: 'sonaleela-action-button-emphasied',
    emphasiedsilent: 'sonaleela-action-button-emphasied-silent',
};

@Component({
    selector: 'slui-action-button, [sluiActionButton]',
    templateUrl: './sonaleela-action-button.html',
    styleUrls: ['./sonaleela-action-button.scss'],
})
export class SonaleelaActionButton implements AfterViewInit {
    @Input() libSonaleelaActionButton: string = '';
    @Input() silent: string = '';

    @HostBinding('class.sonaleela-action-button') sonaleelaButton = true;
    @ViewChild('textNode') textNode: ElementRef<HTMLSpanElement> | undefined;
    @ViewChild('iconNode') iconNode: ElementRef<HTMLSpanElement> | undefined;
    @ContentChild(SonaleelaButtonIcon) icon: SonaleelaButtonIcon | undefined;

    constructor(private elemenetRef: ElementRef) {
        const buttonType = this.getButtonType() || 'normal';
        const silent = this.getIsButtonSilent() ? 'silent' : '';

        this.setButtonTypeClass(buttonType + silent);
    }

    ngAfterViewInit() {
        if (this.textNode?.nativeElement?.childNodes && this.textNode?.nativeElement?.childNodes.length && this.iconNode && this.icon) {
            this.iconNode.nativeElement.style.marginRight = '8px';
        }
    }

    getHostElement() {
        return this.elemenetRef?.nativeElement as HTMLButtonElement;
    }

    getButtonType() {
        return this.getHostElement().getAttribute('libSonaleelaActionButton');
    }

    getIsButtonSilent() {
        return this.getHostElement().hasAttribute('silent');
    }

    setButtonTypeClass(type: string) {
        if (type in SONALEELA_BUTTON_ACTION_TYPE_MAP) {
            this.getHostElement().classList.add(SONALEELA_BUTTON_ACTION_TYPE_MAP[type]);
        }
    }
}

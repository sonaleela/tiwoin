import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Directive,
    DoCheck,
    ElementRef,
    HostBinding,
    Input,
    Optional,
    Self,
    ViewEncapsulation,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
    selector: '[selection-title]',
    template: '<ng-content></ng-content>',
})
export class SonaleelaSelectionCardTitleComponent {
    @HostBinding('class.selection-title') class = true;
}

@Directive({
    selector: '[selection-icon]',
})
export class SonaleelaSelectionCardIconDirective {
    @HostBinding('class.selection-icon') class = true;
}

@Component({
    selector: '[selection-control]',
    template: '<ng-content></ng-content>',
})
export class SonaleelaSelectionCardControlComponent implements DoCheck {
    @HostBinding('class.selection-control') class = true;

    get checked() {
        return this.elementRef.nativeElement.checked;
    }

    readonly stateChanges: Subject<void> = new Subject<void>();

    constructor(@Optional() @Self() public ngControl: NgControl, private elementRef: ElementRef) { }

    ngDoCheck() {
        this.stateChanges.next();
    }
}

@Component({
    selector: 'lib-sonaleela-selection-card',
    templateUrl: './sonaleela-selection-card.html',
    styleUrls: ['./sonaleela-selection-card.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class SonaleelaSelectionCardComponent {
    private _selected = false;
    @Input() set selected(isSelected: boolean | undefined) {
        this._selected = isSelected || this.formControl?.checked;
    }
    get selected() {
        return this.formControl?.checked || this._selected;
    }

    @ContentChild(SonaleelaSelectionCardControlComponent) formControl: SonaleelaSelectionCardControlComponent | undefined;
    constructor(private cdr: ChangeDetectorRef) { }

    ngAfterContentInit() {
        this.formControl?.stateChanges.pipe(startWith(null!)).subscribe(() => {
            this.cdr.markForCheck();
        });
    }
}

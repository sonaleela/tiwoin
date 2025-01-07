import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, input, output } from '@angular/core';
import { getControlIconName } from '@shared';
import { FormFieldTypeEnum } from '@models';

@Component({
    selector: 'sonaleela-form-control-preivew',
    templateUrl: './form-control-preivew.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormControlPreivewComponent {
    readonly control = input<any>();

    readonly edit = output<boolean>();
    readonly copy = output<boolean>();
    readonly delete = output<boolean>();

    get iconName() {
        return getControlIconName(this.control()?.type);
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { getControlIconName } from '@shared';
import { FormFieldTypeEnum } from '@models';

@Component({
    selector: 'sonaleela-control-selection-section',
    templateUrl: './control-selection-section.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlSelectionSectionComponent {
    @Output() selectControl = new EventEmitter();

    fieldTypes = FormFieldTypeEnum;
    getControlIconName = getControlIconName;
}

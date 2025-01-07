import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { getControlIconName } from '@shared';
import { FormFieldTypeEnum } from '@models';

@Component({
    selector: 'sonaleela-control-selection-section',
    templateUrl: './control-selection-section.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ControlSelectionSectionComponent {
    readonly selectControl = output<any>();

    fieldTypes = FormFieldTypeEnum;
    getControlIconName = getControlIconName;
}

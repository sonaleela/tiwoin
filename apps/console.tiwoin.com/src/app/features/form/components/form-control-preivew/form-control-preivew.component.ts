import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { getControlIconName } from '@shared';
import { FormFieldTypeEnum } from '@models';

@Component({
  selector: 'sonaleela-form-control-preivew',
  templateUrl: './form-control-preivew.component.html',
  styles: [`:host { @apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlPreivewComponent {
  @Input() control: any;

  @Output() edit = new EventEmitter();
  @Output() copy = new EventEmitter();
  @Output() delete = new EventEmitter();

  get iconName() {
    return getControlIconName(this.control?.type);
  }
}

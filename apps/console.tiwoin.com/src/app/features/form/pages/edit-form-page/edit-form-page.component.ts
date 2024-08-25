import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-edit-form-page',
  template: `<sonaleela-edit-form-controller></sonaleela-edit-form-controller>`,
  styles: [`:host {@apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormPageComponent { }

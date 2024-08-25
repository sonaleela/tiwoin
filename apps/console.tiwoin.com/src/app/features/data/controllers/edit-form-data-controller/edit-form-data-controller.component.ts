import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-edit-form-data-controller',
  template: `<sonaleela-edit-form-data></sonaleela-edit-form-data>`,
  styles: `:host {@apply block;}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormDataControllerComponent {

}

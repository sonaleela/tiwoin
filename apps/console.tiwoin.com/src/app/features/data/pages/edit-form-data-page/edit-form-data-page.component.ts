import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-edit-form-data-page',
  template: '<sonaleela-edit-form-data-controller></sonaleela-edit-form-data-controller>',
  styles: `:host {@apply block;}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormDataPageComponent { }

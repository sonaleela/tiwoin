import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-view-form-data-page',
  template: `<sonaleela-view-form-data-controller></sonaleela-view-form-data-controller>`,
  styles: `:host {@apply block h-full;}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFormDataPageComponent { }

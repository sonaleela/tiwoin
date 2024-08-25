import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-submit-work-item-page',
  template: `<sonaleela-submit-work-item-controller></sonaleela-submit-work-item-controller>`,
  styles: `:host { @apply block;}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitWorkItemPageComponent { }

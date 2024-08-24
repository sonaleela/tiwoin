import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-signin-page',
  template: `<tiwoin-signin-controller></tiwoin-signin-controller>`,
  styles: [`:host {@apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninPageComponent { }

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-signout-page',
  template: `<tiwoin-signout-controller></tiwoin-signout-controller>`,
  styles: [`:host { @apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignoutPageComponent { }

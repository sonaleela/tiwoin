import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-form-list-page',
  template: `<tiwoin-form-list-controller></tiwoin-form-list-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormListPageComponent { }

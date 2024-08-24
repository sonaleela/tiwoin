import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-document-page',
  template: `<tiwoin-document-controller></tiwoin-document-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentPageComponent {
  constructor() { }
}

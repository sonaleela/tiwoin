import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-site-list-page',
  template: `<tiwoin-site-list-controller></tiwoin-site-list-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteListPageComponent { }

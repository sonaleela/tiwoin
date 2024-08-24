import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-work-item-list-page',
  template: `<tiwoin-work-item-list-controller></tiwoin-work-item-list-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemListPageComponent { }

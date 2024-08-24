import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-work-item-page',
  template: `<tiwoin-work-item-controller></tiwoin-work-item-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemPageComponent { }

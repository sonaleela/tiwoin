import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-work-item-submission-list-page',
  template: `<tiwoin-work-item-submission-list-controller></tiwoin-work-item-submission-list-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemSubmissionListPageComponent { }

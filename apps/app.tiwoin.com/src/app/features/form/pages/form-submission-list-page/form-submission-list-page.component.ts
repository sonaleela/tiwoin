import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'tiwoin-form-submission-list-page',
  template: `<tiwoin-form-submission-list-controller></tiwoin-form-submission-list-controller>`,
  styles: [`:host {@apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSubmissionListPageComponent { }

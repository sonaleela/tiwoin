import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-form-preview-page',
  template: '<sonaleela-form-preview-controller></sonaleela-form-preview-controller>',
  styles: [`:host { @apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPreviewPageComponent { }

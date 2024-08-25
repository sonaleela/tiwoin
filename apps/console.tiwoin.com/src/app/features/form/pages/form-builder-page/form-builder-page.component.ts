import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-form-builder-page',
  template: '<sonaleela-form-builder-controller></sonaleela-form-builder-controller>',
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderPageComponent { }

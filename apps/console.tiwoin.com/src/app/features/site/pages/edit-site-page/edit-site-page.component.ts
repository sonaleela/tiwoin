import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-edit-site-page',
  template: `<sonaleela-edit-site-controller></sonaleela-edit-site-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSitePageComponent {}

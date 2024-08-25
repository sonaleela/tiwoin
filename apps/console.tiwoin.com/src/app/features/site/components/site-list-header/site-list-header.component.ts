import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-site-list-header',
  templateUrl: './site-list-header.component.html',
  styles: [`:host { @apply flex items-center gap-3;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteListHeaderComponent { }

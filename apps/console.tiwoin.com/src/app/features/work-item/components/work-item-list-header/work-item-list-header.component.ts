import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-work-item-list-header',
  templateUrl: './work-item-list-header.component.html',
  styles: [`:host { @apply flex items-center gap-3 py-4; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemListHeaderComponent { }

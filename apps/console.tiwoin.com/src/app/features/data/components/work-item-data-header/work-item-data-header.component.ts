import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-work-item-data-header',
  templateUrl: './work-item-data-header.component.html',
  styles: [`:host { @apply flex items-center gap-3 py-4; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemDataHeaderComponent { }

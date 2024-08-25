import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-user-list-header',
  templateUrl: './user-list-header.component.html',
  styles: [`:host { @apply flex items-center gap-3;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListHeaderComponent { }

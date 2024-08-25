import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-invite-user-page',
  template: `<sonaleela-invite-user-controller></sonaleela-invite-user-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteUserPageComponent { }

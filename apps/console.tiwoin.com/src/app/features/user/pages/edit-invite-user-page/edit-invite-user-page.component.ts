import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-edit-invite-user-page',
  template: `<sonaleela-edit-invite-user-controller></sonaleela-edit-invite-user-controller>`,
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditInviteUserPageComponent { }

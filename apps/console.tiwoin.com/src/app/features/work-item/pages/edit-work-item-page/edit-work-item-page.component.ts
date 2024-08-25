import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sonaleela-edit-work-item-page',
  template: '<sonaleela-edit-work-item-controller></sonaleela-edit-work-item-controller>',
  styles: [':host { @apply block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWorkItemPageComponent { }

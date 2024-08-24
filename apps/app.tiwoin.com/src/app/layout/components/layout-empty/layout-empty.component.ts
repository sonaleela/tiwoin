import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'tiwoin-layout-empty',
  template: `<ng-content></ng-content>`,
  styles: [':host { @apply block h-full; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutEmptyComponent { }

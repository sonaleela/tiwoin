import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[sluiLineTitle]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./line-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineTitleComponent { }

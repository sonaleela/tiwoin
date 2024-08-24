import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[sluiLineText]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./line-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineTextComponent { }

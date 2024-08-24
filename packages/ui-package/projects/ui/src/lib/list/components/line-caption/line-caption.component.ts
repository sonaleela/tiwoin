import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: '[sluiLineCaption]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./line-caption.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineCaptionComponent { }

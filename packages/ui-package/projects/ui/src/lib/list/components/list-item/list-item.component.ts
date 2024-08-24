import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, HostBinding, QueryList } from '@angular/core';
import { LineTextComponent } from '../line-text/line-text.component';
import { LineTitleComponent } from '../line-title/line-title.component';
import { LineCaptionComponent } from '../line-caption/line-caption.component';
import { IconComponent } from '../../../icon';

@Component({
  selector: 'slui-list-item, [sluiListItem]',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @ContentChild(IconComponent) icon?: IconComponent;
  @ContentChildren(LineTitleComponent) titles?: QueryList<LineTitleComponent>;
  @ContentChildren(LineTextComponent) lines?: QueryList<LineTextComponent>;
  @ContentChildren(LineCaptionComponent) captions?: QueryList<LineCaptionComponent>;

  get isOneLine() {
    return this.titles?.length === 1 && this.lines?.length === 0 && this.captions?.length === 0
      || this.titles?.length === 0 && this.lines?.length === 1 && this.captions?.length === 0
      || this.titles?.length === 0 && this.lines?.length === 0 && this.captions?.length === 1;
  }

  get isTwoLine() {
    return this.titles?.length === 1 && this.lines?.length === 1 && this.captions?.length === 0
      || this.titles?.length === 0 && this.lines?.length === 2 && this.captions?.length === 0
      || this.titles?.length === 0 && this.lines?.length === 1 && this.captions?.length === 1;
  }

  get isThreeLine() {
    return this.titles?.length === 1 && this.lines?.length === 1 && this.captions?.length === 1
      || this.titles?.length === 1 && this.lines?.length === 2;
  }

  constructor() { }

  @HostBinding('class.one-line') get oneLine() {
    return this.isOneLine;
  }
  @HostBinding('class.two-line') get twoLine() {
    return this.isTwoLine;
  }
  @HostBinding('class.three-line') get threeLine() {
    return this.isThreeLine;
  }
}

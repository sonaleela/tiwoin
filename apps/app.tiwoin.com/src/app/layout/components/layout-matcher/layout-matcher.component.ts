import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LayoutType } from '@models';

@Component({
  selector: 'tiwoin-layout-matcher',
  templateUrl: './layout-matcher.component.html',
  styles: [`:host { @apply block h-full;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutMatcherComponent {
  @Input() layout: LayoutType = LayoutType.EMPTY;
  layoutTypes = LayoutType;
}

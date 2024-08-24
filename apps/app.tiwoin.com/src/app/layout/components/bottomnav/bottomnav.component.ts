import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tiwoin-bottomnav',
  templateUrl: './bottomnav.component.html',
  styles: [`:host { @apply relative flex justify-around bg-gray-75 border-t border-gray-200;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomnavComponent { }

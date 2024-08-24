import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'slui-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  constructor() { }
}

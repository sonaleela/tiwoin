import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'slui-list-meta',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMetaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

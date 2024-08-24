import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ListComponent, ListItemComponent, ListMetaComponent, LineTextComponent, LineTitleComponent,
  LineCaptionComponent
} from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ListComponent,
    ListItemComponent,
    ListMetaComponent,
    LineTextComponent,
    LineTitleComponent,
    LineCaptionComponent,
  ],
  exports: [
    ListComponent,
    ListItemComponent,
    ListMetaComponent,
    LineTextComponent,
    LineTitleComponent,
    LineCaptionComponent,
  ],
})
export class ListModule { }

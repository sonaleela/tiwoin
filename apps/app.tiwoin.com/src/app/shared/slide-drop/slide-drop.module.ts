import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { SlideDropComponent } from "./components";

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
    ],
    declarations: [SlideDropComponent],
    exports: [SlideDropComponent],
})
export class SlideDropModule { }

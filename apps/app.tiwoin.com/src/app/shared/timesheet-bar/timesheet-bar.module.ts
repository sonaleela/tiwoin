import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetBarComponent } from './components';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TimesheetBarComponent
    ],
    exports: [
        TimesheetBarComponent
    ]
})
export class TimesheetBarModule { }

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FetchEmployee } from '../employee.class';

@Component({
    selector: 'sonaleela-time-leave-controller',
    templateUrl: './time-leave-controller.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeLeaveControllerComponent extends FetchEmployee {
    constructor() {
        super();
    }
}

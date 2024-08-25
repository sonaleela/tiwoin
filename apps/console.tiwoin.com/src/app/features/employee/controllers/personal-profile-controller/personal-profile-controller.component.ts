import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FetchEmployee } from '../employee.class';

@Component({
    selector: 'sonaleela-personal-profile-controller',
    templateUrl: 'personal-profile-controller.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalProfileControllerComponent extends FetchEmployee {
    constructor() {
        super();
    }
}

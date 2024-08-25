import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { FetchEmployee } from '../employee.class';

@Component({
    selector: 'sonaleela-company-profile-controller',
    templateUrl: './company-profile-controller.component.html',
    styles: [':host {@apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyProfileControllerComponent extends FetchEmployee {
    constructor() {
        super();
    }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
    selector: 'sonaleela-signout-controller',
    template: ``,
    styles: [`:host {@apply block}`],
})
export class SignoutControllerComponent {
    constructor(private store: Store) {
        this.store.dispatch(fromStore.SignoutRequestBegin());
    }
}

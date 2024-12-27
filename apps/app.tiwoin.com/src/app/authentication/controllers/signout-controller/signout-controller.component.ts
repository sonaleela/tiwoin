import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";

@Component({
    selector: 'tiwoin-signout-controller',
    template: `signout`,
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SignoutControllerComponent {
    /**
     * Inject
     */
    private store: Store = Inject(Store);

    constructor() {
        this.store.dispatch(fromStore.SignoutRequestBegin());
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";

@Component({
    selector: 'tiwoin-signout-controller',
    template: `signout`,
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignoutControllerComponent {
    constructor(private store: Store) {
        this.store.dispatch(fromStore.SignoutRequestBegin());
    }
}

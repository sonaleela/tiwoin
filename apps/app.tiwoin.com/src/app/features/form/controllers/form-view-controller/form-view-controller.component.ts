import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";

@Component({
    selector: 'tiwoin-form-view-controller',
    templateUrl: './form-view-controller.component.html',
    styles: `:host { @apply flex flex-col bg-gray-100 h-full; }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormViewControllerComponent {
    private store: Store = inject(Store);
    selectFormData$ = this.store.select(fromRootStore.selectActiveFormSubmission);


    back() {
        this.store.dispatch(fromRootStore.Back());
    }
}

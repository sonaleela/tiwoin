import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";

@Component({
    selector: 'tiwoin-form-controller',
    templateUrl: './form-controller.component.html',
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControllerComponent {
    private store: Store = inject(Store);

    form$ = this.store.select(fromRootStore.selectActiveForm);
    isPending$ = this.store.select(fromStore.selectIsSubmissionPending);
    error$ = this.store.select(fromStore.selectSubmissionError);

    submit(body: any) {
        this.store.dispatch(fromStore.FormSubmissionBegin({ body }));
    }

    back() {
        this.store.dispatch(fromRootStore.Back());
    }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";

@Component({
    selector: 'tiwoin-work-item-controller',
    templateUrl: './work-item-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemControllerComponent {
    private store: Store = inject(Store);

    isPending$ = this.store.select(fromStore.selectIsSubmissionPending);
    workItem$ = this.store.select(fromRootStore.selectActiveWorkItem);

    submit(body: any) {
        this.store.dispatch(fromStore.WorkItemSubmissionBegin({ body }));
    }

    back() {
        this.store.dispatch(fromRootStore.Back());
    }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-submit-work-item-controller',
    templateUrl: './submit-work-item-controller.component.html',
    styles: `:host { @apply flex flex-col h-full;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitWorkItemControllerComponent {
    private store: Store = inject(Store);

    isSubmitPending$ = this.store.select(fromStore.selectIsSubmitPending);
    submitError$ = this.store.select(fromStore.selectSubmitError);
    workItem$ = this.store.select(fromRootStore.selectActiveWorkItem);

    submitWorkItem(body: any) {
        this.store.dispatch(fromStore.SubmitWorkItemBegin({ body: { ...body, createdBy: body.createdBy.id } }));
    }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";
import * as fromRootStore from "@store";

@Component({
    selector: 'sonaleela-edit-work-item-controller',
    templateUrl: './edit-work-item-controller.component.html',
    styles: [':host { @apply flex flex-col h-full;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWorkItemControllerComponent {
    private store: Store = inject(Store);

    isEditWorkItemPending$ = this.store.select(fromStore.selectIsEditWorkItemPending);
    editWorkItemError$ = this.store.select(fromStore.selectEditWorkItemError);
    workItem$ = this.store.select(fromRootStore.selectActiveWorkItem);

    submitEditWorkItemForm(body: any) {
        this.store.dispatch(fromStore.EditWorkItemBegin({ body }));
    }
}

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
    selector: 'sonaleela-add-work-item-controller',
    templateUrl: './add-work-item-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorkItemControllerComponent {
    private store: Store = inject(Store);

    isAddWorkItemPending$ = this.store.select(fromStore.selectIsAddWorkItemPending);
    addWorkItemError$ = this.store.select(fromStore.selectAddWorkItemError);

    submitAddWorkItemForm(body: any) {
        this.store.dispatch(fromStore.AddWorkItemBegin({ body }));
    }
}

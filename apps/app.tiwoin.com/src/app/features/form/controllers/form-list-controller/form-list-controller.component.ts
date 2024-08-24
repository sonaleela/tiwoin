import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import * as fromRootStore from "@store";
import { Store } from '@ngrx/store';
@Component({
    selector: 'tiwoin-form-list-controller',
    templateUrl: './form-list-controller.component.html',
    styles: [`:host { @apply block h-full bg-gray-100 h-full overflow-y-auto;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormListControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectFormList);
    isPending$ = this.store.select(fromRootStore.selectIsFormListPending);
    error$ = this.store.select(fromRootStore.selectFetchWorkItemListError);
}

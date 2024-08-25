import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from '@store';
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-form-list-controller',
    templateUrl: './form-list-controller.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormListControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectFormList);
    error$ = this.store.select(fromRootStore.selectFormListError);
    isPending$ = this.store.select(fromRootStore.selectIsFormListPending);

    delete(id: string) {
        this.store.dispatch(fromStore.DeleteFormBegin({ id }));
    }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import * as fromRootStore from "@store";

@Component({
    selector: 'tiwoin-form-submission-list-controller',
    templateUrl: './form-submission-list-controller.component.html',
    styles: [`:host { @apply flex flex-col bg-gray-100 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSubmissionListControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectFormSubmission);
    filterObject$ = this.store.select(fromRootStore.selectFormSubmisstionFilter).pipe(tap(filter => this.filter = filter));
    error$ = this.store.select(fromRootStore.selectFormSubmissionError);
    isPending$ = this.store.select(fromRootStore.selectIsFormSubmissionPending);

    filter: any;

    dateSelect(date: string) {
        this.store.dispatch(fromRootStore.FilterFormSubmissionList({
            filter: {
                ...this.filter,
                date: date,
            },
        }));
    }

    back() {
        this.store.dispatch(fromRootStore.Back());
    }
}

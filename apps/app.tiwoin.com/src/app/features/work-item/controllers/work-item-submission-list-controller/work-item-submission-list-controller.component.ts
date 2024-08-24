import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import { tap } from 'rxjs/operators';

@Component({
    selector: 'tiwoin-work-item-submission-list-controller',
    templateUrl: './work-item-submission-list-controller.component.html',
    styles: [`:host { @apply flex flex-col bg-gray-100 h-full overflow-y-auto;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemSubmissionListControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectWorkItemSubmission);
    filterObject$ = this.store.select(fromRootStore.selectWorkItemSubmissionFilter).pipe(tap(filter => this.filter = filter));
    error$ = this.store.select(fromRootStore.selectWorkItemSubmissionError);
    isPending$ = this.store.select(fromRootStore.selectIsWorkItemSubmissionPending);

    filter: any;

    dateSelect(date: string) {
        this.store.dispatch(fromRootStore.FilterWorkItemSubmissionList({
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

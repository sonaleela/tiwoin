import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import { map } from 'rxjs/operators';

@Component({
    selector: 'tiwoin-timesheet-list-controller',
    templateUrl: './timesheet-list-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full bg-gray-100;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetListControllerComponent {
    private store: Store = inject(Store);
    list$ = this.store.select(fromRootStore.selectTimesheetSubmission);
    filterObject$ = this.store.select(fromRootStore.selectTimesheetSubmissionFilter).pipe(map(filter => this.filter = filter));
    isPending$ = this.store.select(fromRootStore.selectIsTimesheetSubmissionPending);
    error$ = this.store.select(fromRootStore.selectTimesheetSubmissionError);

    filter: any;

    dateSelect(date: string) {
        this.store.dispatch(fromRootStore.FilterTimesheetSubmissionList({
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

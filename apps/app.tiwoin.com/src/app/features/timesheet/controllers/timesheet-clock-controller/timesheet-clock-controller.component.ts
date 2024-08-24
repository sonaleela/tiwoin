import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import dayjs from "dayjs";
import { tap } from 'rxjs/operators';

import * as fromStore from "../../store";

@Component({
    selector: 'tiwoin-timesheet-clock-controller',
    templateUrl: `./timesheet-clock-controller.component.html`,
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetClockControllerComponent {
    private store: Store = inject(Store);
    entryTypes$ = this.store.select(fromStore.selectEntryTypes);
    isEntryTypesPending$ = this.store.select(fromStore.selectIsEntryTypesPending);
    entryTypesError$ = this.store.select(fromStore.selectEntryTypesError);

    isFetchClockEntryPending$ = this.store.select(fromStore.selectIsFetchClockEntryPending);
    fetchClockEntryError$ = this.store.select(fromStore.selectFetchClockEntryError);

    clockEntry$ = this.store.select(fromStore.selectClockEntry);

    isClockEntryPending$ = this.store.select(fromStore.selectIsClockEntryPending);
    clockEntryError$ = this.store.select(fromStore.selectClockEntryError);

    timeEntry(entry: { name: string, type: string }) {
        const time = dayjs();
        this.store.dispatch(fromStore.ClockEntryBegin({ body: { ...entry, time } }));
    }
}

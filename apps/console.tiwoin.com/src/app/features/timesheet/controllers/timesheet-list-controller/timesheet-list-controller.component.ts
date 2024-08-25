import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-timesheet-list-controller',
    templateUrl: './timesheet-list-controller.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetListControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectTimesheetList);
    isPending$ = this.store.select(fromRootStore.selectIsTimesheetListPending);
    error$ = this.store.select(fromRootStore.selectTimesheetListError);

    delete(id: string) {
        this.store.dispatch(fromStore.DeleteTimesheetBegin({ id }));
    }
}

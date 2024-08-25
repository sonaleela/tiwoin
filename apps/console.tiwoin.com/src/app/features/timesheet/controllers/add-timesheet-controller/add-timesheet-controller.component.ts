import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-add-timesheet-controller',
    templateUrl: './add-timesheet-controller.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTimesheetControllerComponent {
    private store: Store = inject(Store);

    isPending$ = this.store.select(fromStore.selectIsAddTimesheetPending);
    error$ = this.store.select(fromStore.selectAddTimesheetError);

    submitTimesheetForm(body: any) {
        this.store.dispatch(fromStore.AddTimesheetBegin({ body }));
    }
}

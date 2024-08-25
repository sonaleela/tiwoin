import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TimesheetModel } from '@models';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-edit-timesheet-controller',
    templateUrl: './edit-timesheet-controller.component.html',
    styles: [':host { @apply flex flex-col h-full; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTimesheetControllerComponent {
    private store: Store = inject(Store);

    isEditPending$ = this.store.select(fromStore.selectIsEditTimesheetPending);
    editError$ = this.store.select(fromStore.selectEditTimesheetError);
    timesheet$ = this.store.select(fromRootStore.selectActiveTimesheet);

    submitForm(timesheet: TimesheetModel) {
        this.store.dispatch(fromStore.UpdateTimesheetBegin({ timesheet }));
    }
}

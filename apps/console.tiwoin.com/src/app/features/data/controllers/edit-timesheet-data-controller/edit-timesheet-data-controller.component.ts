import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";
import * as fromRootStore from "@store";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'sonaleela-edit-timesheet-data-controller',
    template: ` <sonaleela-edit-timesheet-data
        [data]="data | async"
        [isPending]="isPending$ | async"
        [error]="error$ | async"
        (close)="close($event)"
        (addTimesheet)="editTimesheet($event)"></sonaleela-edit-timesheet-data>`,
    styles: `:host { @apply block;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTimesheetDataControllerComponent {
    private store: Store = inject(Store);
    private route: ActivatedRoute = inject(ActivatedRoute)
    private router: Router = inject(Router)

    data = this.store.select(fromRootStore.selectActiveTimesheetDataRecord);
    isPending$ = this.store.select(fromStore.selectIsUpdateTimesheetPending);
    error$ = this.store.select(fromStore.selectUpdateTimesheetError);


    editTimesheet(data: any) {
        this.store.dispatch(fromStore.UpdateTimesheetDataBegin({ data }));
    }

    close(_: any) {
        console.log(this.route.parent, this.route.parent?.snapshot)
        this.router.navigate([{ outlets: { aside: null } }], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
    }
}

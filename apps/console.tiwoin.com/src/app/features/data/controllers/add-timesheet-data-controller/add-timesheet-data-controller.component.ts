import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'sonaleela-add-timesheet-data-controller',
    template: `<sonaleela-add-timesheet-data
    [isPending]="isPending$ | async"
    [error]="error$ | async"
    (close)="close($event)"
    (addTimesheet)="addTimesheet($event)"></sonaleela-add-timesheet-data>`,
    styles: `:host { @apply block;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTimesheetDataControllerComponent {
    private store: Store = inject(Store);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);

    isPending$ = this.store.select(fromStore.selectIsAddTimesheetPending);
    error$ = this.store.select(fromStore.selectAddTimesheetError);

    /**
      * Add timesheet request
      * 
      * @param data
      */
    addTimesheet(data: any) {
        this.store.dispatch(fromStore.AddTimesheetDataBegin({ data }))
    }

    close(_: any) {
        this.router.navigate([{ outlets: { aside: null } }], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
    }
}

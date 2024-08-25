import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'sonaleela-view-work-item-data-controller',
    template: `<sonaleela-view-work-item-data [data]="data$ | async"
        [error]="updateError$ | async"
        [isPending]="isUpdatePending$ | async"
        (close)="clearData()"
        (approve)="approveWorkItem($event)"></sonaleela-view-work-item-data>`,
    styles: `:host {@apply block h-full;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewWorkItemDataControllerComponent {
    private store: Store = inject(Store);
    private router: Router = inject(Router)
    private route: ActivatedRoute = inject(ActivatedRoute)

    data$ = this.store.select(fromRootStore.selectActiveWorkItemDataRecord);
    updateError$ = this.store.select(fromStore.selectUpdateWorkItemError);
    isUpdatePending$ = this.store.select(fromStore.selectIsUpdateWorkItemPending);

    clearData() {
        this.router.navigate([{ outlets: { aside: null } }], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
    }

    approveWorkItem(data: any) {
        this.store.dispatch(fromStore.ApproveWorkItemDataBegin({ data }));
    }
}

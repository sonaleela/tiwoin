import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'sonaleela-edit-work-item-data-controller',
    template: `<sonaleela-edit-work-item-data
        [data]="data$ | async"
        [isPending]="isPending$ | async"
        [error]="error$ | async"
        (close)="close($event)"
        (editWorkItem)="editWorkItem($event)"></sonaleela-edit-work-item-data>`,
    styles: `:host { @apply block; }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWorkItemDataControllerComponent {
    private store: Store = inject(Store);
    private route: ActivatedRoute = inject(ActivatedRoute)
    private router: Router = inject(Router)

    data$ = this.store.select(fromRootStore.selectActiveWorkItemDataRecord);
    isPending$ = this.store.select(fromStore.selectIsUpdateWorkItemPending);
    error$ = this.store.select(fromStore.selectUpdateWorkItemError);

    editWorkItem(data: any) {
        this.store.dispatch(fromStore.UpdateWorkItemDataBegin({ data }));
    }

    close(_: any) {
        this.router.navigate([{ outlets: { aside: null } }], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
    }
}

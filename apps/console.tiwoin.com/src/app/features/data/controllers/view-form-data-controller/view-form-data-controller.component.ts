import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'sonaleela-view-form-data-controller',
    template: `<sonaleela-view-form-data [data]="data$ | async"
        [error]="updateError$ | async"
        [isPending]="isUpdatePending$ | async"
        (close)="clearData()"
        (approve)="approveForm($event)"></sonaleela-view-form-data>`,
    styles: `:host {@apply block h-full;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFormDataControllerComponent {
    private store: Store = inject(Store);
    private router: Router = inject(Router)
    private route: ActivatedRoute = inject(ActivatedRoute)

    data$ = this.store.select(fromRootStore.selectActiveFormDataRecord);
    updateError$ = this.store.select(fromStore.selectUpdateFormError);
    isUpdatePending$ = this.store.select(fromStore.selectIsUpdateFormPending);


    clearData() {
        this.router.navigate([{ outlets: { aside: null } }], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
    }

    approveForm(data: any) {
        this.store.dispatch(fromStore.ApproveFormDataBegin({ data }));
    }
}

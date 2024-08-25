import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { emptyFilterObject } from '@shared';

import * as fromRootStore from "@store";
import { tap } from 'rxjs/operators';

@Component({
    selector: 'sonaleela-work-item-data-controller',
    templateUrl: './work-item-data-controller.component.html',
    styles: [`:host { @apply grid grid-rows-[64px,1fr] overflow-hidden h-full transition-all;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemDataControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectWorkItemData);
    total$ = this.store.select(fromRootStore.selectWorkItemDataTotal);
    filterObject$ = this.store.select(fromRootStore.selectWorkItemDataFilter).pipe(tap(filter => this.filter = filter));
    isPending$ = this.store.select(fromRootStore.selectIsWorkItemDataPending);
    error$ = this.store.select(fromRootStore.selectWorkItemDataError);
    longDateFormat$ = this.store.select(fromRootStore.selectLongDateFormat);

    geoLocation: any;
    filter: any;

    @HostBinding('class') get isSidePanel() { return !!this.geoLocation ? 'grid-cols-[1fr,1fr]' : 'grid-cols-[1fr,36px]'; }
    @HostBinding('class') sidePanelClass = 'grid-cols-[1fr,36px]';

    selectGeoLocationData(geoLocation: any) {
        this.geoLocation = geoLocation;
    }

    clearData() {
        this.geoLocation = null;
    }

    filterEvent(event: any) {
        this.store.dispatch(fromRootStore.FilterWorkItemsData({
            filter: {
                ...this.filter,
                ...event,
                page: 0,
            },
        }));
    }

    clearFilter(_: any) {
        this.store.dispatch(fromRootStore.FilterWorkItemsData({ filter: emptyFilterObject() }));
    }

    sortBy(event: { active: string, direction: string }) {
        this.store.dispatch(fromRootStore.FilterWorkItemsData({
            filter: {
                ...this.filter,
                sortBy: event.active,
                direction: event.direction,
            },
        }));
    }

    changePage(event: any) {
        this.store.dispatch(fromRootStore.FilterWorkItemsData({
            filter: {
                ...this.filter,
                page: event?.pageIndex,
            }
        }));
    }

    /**
     * Update class based on active/de-active route
     */
    activateRoute(event: any) {
        this.sidePanelClass = 'grid-cols-[1fr,1fr]';
    }
    deactivateRoute(event: any) {
        this.sidePanelClass = 'grid-cols-[1fr,36px]';
    }
}

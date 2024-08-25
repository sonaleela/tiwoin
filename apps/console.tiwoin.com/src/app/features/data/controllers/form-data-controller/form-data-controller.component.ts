import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { emptyFilterObject } from '@shared';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";
import { tap } from 'rxjs/operators';

@Component({
    selector: 'sonaleela-form-data-controller',
    templateUrl: './form-data-controller.component.html',
    styles: [`:host { @apply grid grid-rows-[64px,1fr] overflow-hidden h-full transition-all;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDataControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectFormData);
    total$ = this.store.select(fromRootStore.selectFormDataTotal);
    filterObject$ = this.store.select(fromRootStore.selectFormDataFilter).pipe(tap(filter => this.filter = filter));
    isPending$ = this.store.select(fromRootStore.selectIsFormDataPending);
    error$ = this.store.select(fromRootStore.selectFormDataError);
    longDateFormat$ = this.store.select(fromRootStore.selectLongDateFormat);

    updateError$ = this.store.select(fromStore.selectUpdateFormError);
    isUpdatePending$ = this.store.select(fromStore.selectIsUpdateFormPending);
    geoLocation: any;
    formViewData: any;
    filter: any;

    @HostBinding('class') get isSidePanel() { return !!this.geoLocation ? 'grid-cols-[1fr,1fr]' : 'grid-cols-[1fr,36px]'; }
    @HostBinding('class') sidePanelClass = 'grid-cols-[1fr,36px]';

    selectFormData(formViewData: any) {
        this.formViewData = formViewData;
        this.geoLocation = null;
    }

    selectGeoLocationData(geoLocation: any) {
        this.geoLocation = geoLocation;
        this.formViewData = null;
    }

    clearData() {
        this.geoLocation = null;
        this.formViewData = null;
    }

    approveForm(data: any) {
        this.store.dispatch(fromStore.UpdateFormDataBegin({ data }));
    }

    filterEvent(event: any) {
        this.store.dispatch(fromRootStore.FilterFormsData({
            filter: {
                ...this.filter,
                ...event,
                page: 0,
            },
        }));
    }

    clearFilter(_: any) {
        this.store.dispatch(fromRootStore.FilterFormsData({ filter: emptyFilterObject() }));
    }

    sortBy(event: { active: string, direction: string }) {
        this.store.dispatch(fromRootStore.FilterFormsData({
            filter: {
                ...this.filter,
                sortBy: event.active,
                direction: event.direction,
            },
        }));
    }

    changePage(event: any) {
        this.store.dispatch(fromRootStore.FilterFormsData({
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

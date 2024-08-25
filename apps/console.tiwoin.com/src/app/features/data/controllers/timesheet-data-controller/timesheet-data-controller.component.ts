import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { emptyFilterObject } from '@shared';
import * as fromRootStore from "@store";
import * as fromStore from "../../store";
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'sonaleela-timesheet-data-controller',
    templateUrl: './timesheet-data-controller.component.html',
    styles: [`:host { @apply grid grid-rows-[64px,1fr] overflow-hidden h-full transition-all;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetDataControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectTimesheetData);
    filterObject$ = this.store.select(fromRootStore.selectTimesheetDataFilter).pipe(tap(filter => this.filter = filter));
    isPending$ = this.store.select(fromRootStore.selectIsTimesheetDataPending);
    error$ = this.store.select(fromRootStore.selectTimesheetDataError);
    timeFormat$ = this.store.select(fromRootStore.selectTimeFormat);

    geoLocation: any;
    filter: any;

    @HostBinding('class') sidePanelClass = 'grid-cols-[1fr,36px]';


    /**
     * Show geo-location data in side panel
     * @param geoLocation 
     */
    selectGeoLocationData(geoLocation: any) {
        this.geoLocation = geoLocation;
    }

    /**
     * Clear side panel
     */
    clearData() {
        this.geoLocation = false;
    }

    /**
     * Clear filter object
     * 
     * @param _ 
     */
    clearFilter(_: any) {
        this.store.dispatch(fromRootStore.FilterTimesheetData({ filter: emptyFilterObject() }));
    }

    /**
     * Sort data by field name
     * 
     * @param event 
     */
    sortBy(event: { active: string, direction: string }) {
        this.store.dispatch(fromRootStore.FilterTimesheetData({
            filter: {
                ...this.filter,
                sortBy: event.active,
                direction: event.direction,
            },
        }));
    }

    /**
     * Filter data for date and other filters
     * 
     * @param date 
     */
    dateSelect(date: string) {
        this.store.dispatch(fromRootStore.FilterTimesheetData({
            filter: {
                ...this.filter,
                date: date,
            },
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

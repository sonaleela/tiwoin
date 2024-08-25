import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { emptyFilterObject } from '@shared';
import * as fromRouter from './app-router.store';
import * as fromEntity from '../app-entity';

@Injectable()
export class RouterEffects {
    private actions$: Actions = inject(Actions);
    private store: Store = inject(Store)

    /**
     * Dispatch `fetch employees list` action for `/employee` route
     */
    fetchEmployeeList$ = createEffect(() => this.actions$.pipe(
        ofType(routerNavigatedAction),
        concatLatestFrom(() => [
            this.store.select(fromRouter.selectUrl),
            this.store.select(fromRouter.selectRouteParam('uid')),
            this.store.select(fromRouter.selectQueryParams),
        ]),
        map(([_, url = '', uid, queryParams]) => {
            if (url === '/employee') return this.store.dispatch(fromEntity.FetchEmployeeListBegin({}));
            if (url === '/payroll') return this.store.dispatch(fromEntity.FetchPayrollListBegin());
            if (url === '/payroll/components') this.store.dispatch(fromEntity.FetchPayrollComponentListBegin());
            if (url === '/work-item') return this.store.dispatch(fromEntity.FetchWorkItemListBegin());
            if (url === '/site') return this.store.dispatch(fromEntity.FetchSiteListBegin());
            if (url === '/form') return this.store.dispatch(fromEntity.FetchFormListBegin());
            if (url === '/user') return this.store.dispatch(fromEntity.FetchUserListBegin());
            if (url === '/timesheet') return this.store.dispatch(fromEntity.FetchTimesheetListBegin());

            if (url.startsWith('/employee') && uid) return this.store.dispatch(fromEntity.FetchEmployeeBegin({ uid }));
            if (url.startsWith('/payroll') && uid) return this.store.dispatch(fromEntity.FetchPayrollBegin({ uid }));
            if (url.startsWith('/form') && uid) return this.store.dispatch(fromEntity.FetchFormBegin({ uid }));
            if (url.startsWith('/employee') && uid) return this.store.dispatch(fromEntity.FetchEmployeeBegin({ uid }));
            if (url.startsWith('/timesheet') && uid) return this.store.dispatch(fromEntity.FetchTimesheetBegin({ uid }));
            if (url.startsWith('/work-item') && uid) return this.store.dispatch(fromEntity.FetchWorkItemBegin({ uid }));
            if (url.startsWith('/site') && uid) return this.store.dispatch(fromEntity.FetchSiteBegin({ uid }));
            if (url.startsWith('/user/invite') && uid) return this.store.dispatch(fromEntity.FetchUserBegin({ uid }));

            if (url.startsWith('/data/timesheet') && url.includes('aside:edit') && uid) return this.store.dispatch(fromEntity.FetchTimesheetDataRecordBegin({ uid }));
            if (url.startsWith('/data/timesheet')) this.store.dispatch(fromEntity.FetchTimesheetDataBegin({ filter: { ...emptyFilterObject(), ...queryParams, }, }));
            if (url.startsWith('/data/form') && (url.includes('aside:edit') || url.includes('aside:view')) && uid) return this.store.dispatch(fromEntity.FetchFormDataRecordBegin({ uid }));
            if (url.startsWith('/data/form')) this.store.dispatch(fromEntity.FetchFormDataBegin({ filter: { ...emptyFilterObject(), ...queryParams, }, }));
            if (url.startsWith('/data/payroll')) this.store.dispatch(fromEntity.FetchPayrollDataBegin({ filter: { ...emptyFilterObject(), ...queryParams, } }));
            if (url.startsWith('/data/work-item') && (url.includes('aside:edit') || url.includes('aside:view')) && uid) return this.store.dispatch(fromEntity.FetchWorkItemDataRecordBegin({ uid }));
            if (url.startsWith('/data/work-item')) this.store.dispatch(fromEntity.FetchWorkItemDataBegin({ filter: { ...emptyFilterObject(), ...queryParams, }, }));
        }),
    ), { dispatch: false });
}

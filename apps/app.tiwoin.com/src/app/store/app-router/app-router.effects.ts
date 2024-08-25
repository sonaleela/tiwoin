import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromRouter from './app-router.store';
import * as fromEntity from "../app-entity";
import { emptyFilterObject } from "@shared";

@Injectable()
export class RouterEffects {
    private actions$: Actions = inject(Actions);
    private store: Store = inject(Store);

    /**
     * Dispatch `fetch employees list` action for `/employee` route
     */
    fetchEmployeeList$ = createEffect(() => this.actions$.pipe(
        ofType(routerNavigatedAction),
        concatLatestFrom(() => [
            this.store.select(fromRouter.selectUrl),
            this.store.select(fromRouter.selectRouteParam('uid')),
            this.store.select(fromRouter.selectQueryParams)
        ]),
        map(([_, url = '', uid, params]) => {
            if (url.startsWith('/work-item') && uid) return this.store.dispatch(fromEntity.FetchWorkItemBegin({ uid }));
            if (url === '/work-item/list') return this.store.dispatch(fromEntity.FetchWorkItemListBegin());
            if (url.startsWith('/work-item')) return this.store.dispatch(fromEntity.FetchWorkItemSubmissionListBegin({
                filter: {
                    ...emptyFilterObject(),
                    ...params,
                }
            }));

            if (url.startsWith('/form/view') && uid) return this.store.dispatch(fromEntity.FetchFormSubmissionBegin({ uid }));
            if (url.startsWith('/form') && uid) return this.store.dispatch(fromEntity.FetchFormBegin({ uid }));
            if (url === '/form/list') return this.store.dispatch(fromEntity.FetchFormListBegin());
            if (url.startsWith('/form')) return this.store.dispatch(fromEntity.FetchFormSubmissionListBegin({
                filter: {
                    ...emptyFilterObject(),
                    ...params,
                }
            }));

            if (url === '/profile/document') return this.store.dispatch(fromEntity.FetchDocumentListBegin());

            if (url.startsWith('/timesheet') && !url.startsWith('/timesheet/clock')) return this.store.dispatch(fromEntity.FetchTimesheetSubmissionListBegin({
                filter: {
                    ...emptyFilterObject(),
                    ...params,
                }
            }));

            if (url === '/site') return this.store.dispatch(fromEntity.FetchSiteListBegin());
        }),
    ), { dispatch: false });
}

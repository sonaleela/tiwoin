import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromActions from './timesheet.actions';
import * as fromRootStore from "@store";

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
            this.store.select(fromRootStore.selectUrl),
            this.store.select(fromRootStore.selectRouteParam('uid'))
        ]),
        map(([_, url = '', __]) => {
            if (url === '/timesheet/clock') {
                this.store.dispatch(fromActions.FetchClockEntryBegin());
                this.store.dispatch(fromActions.FetchEntryTypeBegin());
            }
        }),
    ), { dispatch: false });
}

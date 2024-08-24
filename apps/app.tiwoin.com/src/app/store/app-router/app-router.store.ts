import { getRouterSelectors } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';

export const routerStoreKey = 'router';

const selectRouter = createSelector(
    (state: any) => state[routerStoreKey],
    (value) => value,
);

export const {
    selectCurrentRoute,
    selectFragment,
    selectQueryParams,
    selectQueryParam,
    selectRouteParams,
    selectRouteParam,
    selectRouteData,
    selectUrl,
} = getRouterSelectors(selectRouter);

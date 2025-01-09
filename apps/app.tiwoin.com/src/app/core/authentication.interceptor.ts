import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHandlerFn } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '@services';
import * as fromRootStore from '../store';

export function authenticationInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authenticationService = inject(AuthenticationService);
    const store = inject(Store);

    // Do nothing if request for icons
    if (request.url.includes('assets/icons/')) {
        return next(request.clone());
    }

    const accessToken$ = authenticationService.getAccessToken();
    const apiPath$ = store.select(fromRootStore.selectConfig).pipe(take(1));
    const organization$ = store.select(fromRootStore.selectOrganization).pipe(take(1));

    return combineLatest([accessToken$, apiPath$, organization$]).pipe(
        switchMap(([authToken, config, organization]) => {
            const requestClone = request.clone({
                setHeaders: {
                    authorization: `Bearer ${authToken}`,
                    ...(organization?.id && { 'organization-id': organization.id }),
                },
                url: `${config.sonaleela.basePath}${request.url}`,
            });
            return next(requestClone);
        }),
    );
}

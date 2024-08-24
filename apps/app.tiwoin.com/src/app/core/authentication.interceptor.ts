import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '@services';
import * as fromRootStore from '../store';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private store: Store) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.url.includes('assets/icons/')) {
            return next.handle(request.clone());
        }

        const accessToken$ = this.authenticationService.getAccessToken();
        const apiPath$ = this.store.select(fromRootStore.selectConfig).pipe(take(1));
        const organization$ = this.store.select(fromRootStore.selectOrganization).pipe(take(1));

        return combineLatest([accessToken$, apiPath$, organization$]).pipe(
            switchMap(([authToken, config, organization]) => {
                const requestClone = request.clone({
                    setHeaders: {
                        authorization: `Bearer ${authToken}`,
                        ...(organization?.id && { 'organization-id': organization.id }),
                    },
                    url: `${config.sonaleela.basePath}${request.url}`,
                });
                return next.handle(requestClone);
            }),
        );
    }
}

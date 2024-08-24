import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { AuthenticationInterceptor } from './authentication.interceptor';

export * from './authentication.guard';
export * from './unauthentication.guard';

export const httpInterceptorProvider: Provider[] = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true,
    },
];

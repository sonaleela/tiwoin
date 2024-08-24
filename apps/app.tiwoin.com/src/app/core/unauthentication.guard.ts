import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '@services';
import { catchError, map } from 'rxjs/operators';

export const unauthenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    const router = inject(Router);
    const authenticationService = inject(AuthenticationService);

    return authenticationService.getUser().pipe(
        map((_: any) => router.createUrlTree(['/'])),
        catchError((error: any, _: any) => of(true)),
    );
}

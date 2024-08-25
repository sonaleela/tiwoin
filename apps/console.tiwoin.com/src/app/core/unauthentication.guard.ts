import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '@services';
import { catchError, map } from 'rxjs/operators';

export const unauthenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);

    return authenticationService.getUser().pipe(
        map((user) => router.createUrlTree(['/'])),
        catchError((error, _) => of(true)),
    );
}

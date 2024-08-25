import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '@services';
import { catchError, map } from 'rxjs/operators';

export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);

    return authenticationService.getUser().pipe(
        map((user) => true),
        catchError((error, _) => of(router.createUrlTree(['/signin']))),
    );
}

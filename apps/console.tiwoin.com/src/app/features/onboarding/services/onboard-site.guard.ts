import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';

import * as fromStore from '../store';
import { map } from 'rxjs/operators';

export const onboardSiteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    const store = inject(Store);
    const router = inject(Router);

    return combineLatest([store.select(fromStore.selectCurrentStep), store.select(fromStore.selectOrganizationId)]).pipe(
        map(([currentStep, organizationId]) => {
            if (currentStep === fromStore.OnboardingSteps.CREATE_SITE && organizationId) {
                return true;
            }
            return router.createUrlTree(['/']);
        }),
    );
}

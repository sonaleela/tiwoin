import { TestBed } from '@angular/core/testing';

import { OnboardSiteGuard } from './onboard-site.guard';

describe('OnboardSiteGuard', () => {
    let guard: OnboardSiteGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(OnboardSiteGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});

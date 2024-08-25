import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardSitePageComponent } from './onboard-site-page.component';

describe('OnboardSitePageComponent', () => {
    let component: OnboardSitePageComponent;
    let fixture: ComponentFixture<OnboardSitePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OnboardSitePageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardSitePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardOrganizationPageComponent } from './onboard-organization-page.component';

describe('OnboardOrganizationPageComponent', () => {
    let component: OnboardOrganizationPageComponent;
    let fixture: ComponentFixture<OnboardOrganizationPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OnboardOrganizationPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardOrganizationPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

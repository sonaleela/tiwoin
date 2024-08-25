import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileControllerComponent } from './company-profile-controller.component';

describe('CompanyProfileControllerComponent', () => {
    let component: CompanyProfileControllerComponent;
    let fixture: ComponentFixture<CompanyProfileControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompanyProfileControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyProfileControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

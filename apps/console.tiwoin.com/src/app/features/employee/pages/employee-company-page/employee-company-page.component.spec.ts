import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCompanyPageComponent } from './employee-company-page.component';

describe('EmployeeCompanyPageComponent', () => {
    let component: EmployeeCompanyPageComponent;
    let fixture: ComponentFixture<EmployeeCompanyPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeCompanyPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeCompanyPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

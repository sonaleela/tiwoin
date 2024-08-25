import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIncomePageComponent } from './employee-income-page.component';

describe('EmployeeIncomePageComponent', () => {
    let component: EmployeeIncomePageComponent;
    let fixture: ComponentFixture<EmployeeIncomePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeIncomePageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeIncomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

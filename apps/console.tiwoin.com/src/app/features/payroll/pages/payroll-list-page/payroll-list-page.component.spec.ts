import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollListPageComponent } from './payroll-list-page.component';

describe('PayrollListPageComponent', () => {
    let component: PayrollListPageComponent;
    let fixture: ComponentFixture<PayrollListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PayrollListPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PayrollListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

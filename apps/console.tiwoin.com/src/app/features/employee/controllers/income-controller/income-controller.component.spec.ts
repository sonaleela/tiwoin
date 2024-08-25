import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeControllerComponent } from './income-controller.component';

describe('IncomeControllerComponent', () => {
    let component: IncomeControllerComponent;
    let fixture: ComponentFixture<IncomeControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IncomeControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IncomeControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

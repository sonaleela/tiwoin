import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListControllerComponent } from './employee-list-controller.component';

describe('EmployeeListControllerComponent', () => {
    let component: EmployeeListControllerComponent;
    let fixture: ComponentFixture<EmployeeListControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeListControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeListControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

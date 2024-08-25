import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeControllerComponent } from './add-employee-controller.component';

describe('AddEmployeeControllerComponent', () => {
    let component: AddEmployeeControllerComponent;
    let fixture: ComponentFixture<AddEmployeeControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddEmployeeControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddEmployeeControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

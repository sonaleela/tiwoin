import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePersonalPageComponent } from './employee-personal-page.component';

describe('EmployeePersonalPageComponent', () => {
    let component: EmployeePersonalPageComponent;
    let fixture: ComponentFixture<EmployeePersonalPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeePersonalPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeePersonalPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

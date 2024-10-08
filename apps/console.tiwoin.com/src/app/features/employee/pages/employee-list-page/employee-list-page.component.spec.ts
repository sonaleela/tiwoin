import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListPageComponent } from './employee-list-page.component';

describe('EmployeeListPageComponent', () => {
    let component: EmployeeListPageComponent;
    let fixture: ComponentFixture<EmployeeListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeListPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

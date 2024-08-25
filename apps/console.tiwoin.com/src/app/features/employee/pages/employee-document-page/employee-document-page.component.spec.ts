import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDocumentPageComponent } from './employee-document-page.component';

describe('EmployeeDocumentPageComponent', () => {
    let component: EmployeeDocumentPageComponent;
    let fixture: ComponentFixture<EmployeeDocumentPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeDocumentPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeDocumentPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

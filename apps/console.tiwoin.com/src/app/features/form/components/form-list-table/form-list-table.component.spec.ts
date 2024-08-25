import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListTableComponent } from './form-list-table.component';

describe('FormListTableComponent', () => {
    let component: FormListTableComponent;
    let fixture: ComponentFixture<FormListTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormListTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormListTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

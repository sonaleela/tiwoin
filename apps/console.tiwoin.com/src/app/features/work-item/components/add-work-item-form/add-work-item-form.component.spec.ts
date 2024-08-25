import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkItemFormComponent } from './add-work-item-form.component';

describe('AddWorkItemFormComponent', () => {
    let component: AddWorkItemFormComponent;
    let fixture: ComponentFixture<AddWorkItemFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddWorkItemFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddWorkItemFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

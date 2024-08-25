import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkItemPageComponent } from './add-work-item-page.component';

describe('AddWorkItemPageComponent', () => {
    let component: AddWorkItemPageComponent;
    let fixture: ComponentFixture<AddWorkItemPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddWorkItemPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddWorkItemPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

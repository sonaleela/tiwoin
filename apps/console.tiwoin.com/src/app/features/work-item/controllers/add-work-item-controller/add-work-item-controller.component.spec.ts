import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkItemControllerComponent } from './add-work-item-controller.component';

describe('AddWorkItemControllerComponent', () => {
    let component: AddWorkItemControllerComponent;
    let fixture: ComponentFixture<AddWorkItemControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddWorkItemControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddWorkItemControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

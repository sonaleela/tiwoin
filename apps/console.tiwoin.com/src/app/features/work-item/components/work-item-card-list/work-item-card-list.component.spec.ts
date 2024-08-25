import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemCardListComponent } from './work-item-card-list.component';

describe('WorkItemCardListComponent', () => {
    let component: WorkItemCardListComponent;
    let fixture: ComponentFixture<WorkItemCardListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkItemCardListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkItemCardListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

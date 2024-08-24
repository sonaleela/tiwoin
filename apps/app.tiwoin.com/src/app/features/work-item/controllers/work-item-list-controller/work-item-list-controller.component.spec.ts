import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemListControllerComponent } from './work-item-list-controller.component';

describe('WorkItemListControllerComponent', () => {
  let component: WorkItemListControllerComponent;
  let fixture: ComponentFixture<WorkItemListControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemListControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

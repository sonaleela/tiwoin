import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemDataControllerComponent } from './work-item-data-controller.component';

describe('WorkItemDataControllerComponent', () => {
  let component: WorkItemDataControllerComponent;
  let fixture: ComponentFixture<WorkItemDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemDataControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

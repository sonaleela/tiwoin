import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemControllerComponent } from './work-item-controller.component';

describe('WorkItemControllerComponent', () => {
  let component: WorkItemControllerComponent;
  let fixture: ComponentFixture<WorkItemControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

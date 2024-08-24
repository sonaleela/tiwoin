import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemSubmissionListControllerComponent } from './work-item-submission-list-controller.component';

describe('WorkItemSubmissionListControllerComponent', () => {
  let component: WorkItemSubmissionListControllerComponent;
  let fixture: ComponentFixture<WorkItemSubmissionListControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemSubmissionListControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemSubmissionListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

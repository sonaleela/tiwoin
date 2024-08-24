import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemSubmissionListComponent } from './work-item-submission-list.component';

describe('WorkItemSubmissionListComponent', () => {
  let component: WorkItemSubmissionListComponent;
  let fixture: ComponentFixture<WorkItemSubmissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemSubmissionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemSubmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

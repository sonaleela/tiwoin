import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemSubmissionListPageComponent } from './work-item-submission-list-page.component';

describe('WorkItemSubmissionListPageComponent', () => {
  let component: WorkItemSubmissionListPageComponent;
  let fixture: ComponentFixture<WorkItemSubmissionListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemSubmissionListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemSubmissionListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

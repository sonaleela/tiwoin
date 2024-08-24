import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmissionListPageComponent } from './form-submission-list-page.component';

describe('FormSubmissionListPageComponent', () => {
  let component: FormSubmissionListPageComponent;
  let fixture: ComponentFixture<FormSubmissionListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubmissionListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubmissionListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmissionListControllerComponent } from './form-submission-list-controller.component';

describe('FormSubmissionListControllerComponent', () => {
  let component: FormSubmissionListControllerComponent;
  let fixture: ComponentFixture<FormSubmissionListControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubmissionListControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubmissionListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

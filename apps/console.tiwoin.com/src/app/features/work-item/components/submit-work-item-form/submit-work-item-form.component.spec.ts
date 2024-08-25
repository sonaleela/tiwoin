import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitWorkItemFormComponent } from './submit-work-item-form.component';

describe('SubmitWorkItemFormComponent', () => {
  let component: SubmitWorkItemFormComponent;
  let fixture: ComponentFixture<SubmitWorkItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitWorkItemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitWorkItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

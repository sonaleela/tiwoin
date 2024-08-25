import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitWorkItemControllerComponent } from './submit-work-item-controller.component';

describe('SubmitWorkItemControllerComponent', () => {
  let component: SubmitWorkItemControllerComponent;
  let fixture: ComponentFixture<SubmitWorkItemControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitWorkItemControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitWorkItemControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

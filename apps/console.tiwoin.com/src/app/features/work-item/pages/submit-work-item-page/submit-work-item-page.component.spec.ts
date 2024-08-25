import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitWorkItemPageComponent } from './submit-work-item-page.component';

describe('SubmitWorkItemPageComponent', () => {
  let component: SubmitWorkItemPageComponent;
  let fixture: ComponentFixture<SubmitWorkItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitWorkItemPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitWorkItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

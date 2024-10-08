import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemViewComponent } from './work-item-view.component';

describe('WorkItemViewComponent', () => {
  let component: WorkItemViewComponent;
  let fixture: ComponentFixture<WorkItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkItemViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemDataComponent } from './work-item-data.component';

describe('WorkItemDataComponent', () => {
  let component: WorkItemDataComponent;
  let fixture: ComponentFixture<WorkItemDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

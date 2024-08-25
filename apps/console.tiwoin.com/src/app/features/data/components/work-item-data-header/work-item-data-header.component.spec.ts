import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemDataHeaderComponent } from './work-item-data-header.component';

describe('WorkItemDataHeaderComponent', () => {
  let component: WorkItemDataHeaderComponent;
  let fixture: ComponentFixture<WorkItemDataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemDataHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

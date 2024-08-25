import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemListHeaderComponent } from './work-item-list-header.component';

describe('WorkItemListHeaderComponent', () => {
  let component: WorkItemListHeaderComponent;
  let fixture: ComponentFixture<WorkItemListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemListHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

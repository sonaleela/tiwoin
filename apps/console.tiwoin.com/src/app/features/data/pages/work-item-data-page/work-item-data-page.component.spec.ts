import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemDataPageComponent } from './work-item-data-page.component';

describe('WorkItemDataPageComponent', () => {
  let component: WorkItemDataPageComponent;
  let fixture: ComponentFixture<WorkItemDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemDataPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

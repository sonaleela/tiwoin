import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkItemDataComponent } from './view-work-item-data.component';

describe('ViewWorkItemDataComponent', () => {
  let component: ViewWorkItemDataComponent;
  let fixture: ComponentFixture<ViewWorkItemDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWorkItemDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWorkItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkItemDataControllerComponent } from './view-work-item-data-controller.component';

describe('ViewWorkItemDataControllerComponent', () => {
  let component: ViewWorkItemDataControllerComponent;
  let fixture: ComponentFixture<ViewWorkItemDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWorkItemDataControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWorkItemDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

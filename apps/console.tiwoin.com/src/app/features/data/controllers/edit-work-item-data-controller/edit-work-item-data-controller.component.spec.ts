import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkItemDataControllerComponent } from './edit-work-item-data-controller.component';

describe('EditWorkItemDataControllerComponent', () => {
  let component: EditWorkItemDataControllerComponent;
  let fixture: ComponentFixture<EditWorkItemDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkItemDataControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditWorkItemDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkItemControllerComponent } from './edit-work-item-controller.component';

describe('EditWorkItemControllerComponent', () => {
  let component: EditWorkItemControllerComponent;
  let fixture: ComponentFixture<EditWorkItemControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkItemControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkItemControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

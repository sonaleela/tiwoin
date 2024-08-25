import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkItemFormComponent } from './edit-work-item-form.component';

describe('EditWorkItemFormComponent', () => {
  let component: EditWorkItemFormComponent;
  let fixture: ComponentFixture<EditWorkItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkItemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

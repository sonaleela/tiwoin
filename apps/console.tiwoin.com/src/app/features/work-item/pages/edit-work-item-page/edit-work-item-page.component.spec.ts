import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkItemPageComponent } from './edit-work-item-page.component';

describe('EditWorkItemPageComponent', () => {
  let component: EditWorkItemPageComponent;
  let fixture: ComponentFixture<EditWorkItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkItemPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

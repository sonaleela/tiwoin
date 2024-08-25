import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkItemDataComponent } from './edit-work-item-data.component';

describe('EditWorkItemDataComponent', () => {
  let component: EditWorkItemDataComponent;
  let fixture: ComponentFixture<EditWorkItemDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkItemDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditWorkItemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

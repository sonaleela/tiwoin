import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkItemDataPageComponent } from './edit-work-item-data-page.component';

describe('EditWorkItemDataPageComponent', () => {
  let component: EditWorkItemDataPageComponent;
  let fixture: ComponentFixture<EditWorkItemDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkItemDataPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditWorkItemDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

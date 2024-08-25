import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormDataPageComponent } from './edit-form-data-page.component';

describe('EditFormDataPageComponent', () => {
  let component: EditFormDataPageComponent;
  let fixture: ComponentFixture<EditFormDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFormDataPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFormDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

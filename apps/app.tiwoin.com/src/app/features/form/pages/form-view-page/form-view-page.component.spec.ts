import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewPageComponent } from './form-view-page.component';

describe('FormViewPageComponent', () => {
  let component: FormViewPageComponent;
  let fixture: ComponentFixture<FormViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

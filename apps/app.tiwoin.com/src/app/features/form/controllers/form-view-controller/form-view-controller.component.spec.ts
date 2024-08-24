import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewControllerComponent } from './form-view-controller.component';

describe('FormViewControllerComponent', () => {
  let component: FormViewControllerComponent;
  let fixture: ComponentFixture<FormViewControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViewControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormViewControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormDataControllerComponent } from './view-form-data-controller.component';

describe('ViewFormDataControllerComponent', () => {
  let component: ViewFormDataControllerComponent;
  let fixture: ComponentFixture<ViewFormDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFormDataControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFormDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

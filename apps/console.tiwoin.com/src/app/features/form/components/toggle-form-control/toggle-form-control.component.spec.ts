import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleFormControlComponent } from './toggle-form-control.component';

describe('ToggleFormControlComponent', () => {
  let component: ToggleFormControlComponent;
  let fixture: ComponentFixture<ToggleFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

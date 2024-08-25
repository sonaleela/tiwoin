import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlPreivewComponent } from './form-control-preivew.component';

describe('FormControlPreivewComponent', () => {
  let component: FormControlPreivewComponent;
  let fixture: ComponentFixture<FormControlPreivewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormControlPreivewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormControlPreivewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

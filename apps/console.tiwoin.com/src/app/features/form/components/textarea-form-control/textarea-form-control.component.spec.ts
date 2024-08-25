import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaFormControlComponent } from './textarea-form-control.component';

describe('TextareaFormControlComponent', () => {
  let component: TextareaFormControlComponent;
  let fixture: ComponentFixture<TextareaFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

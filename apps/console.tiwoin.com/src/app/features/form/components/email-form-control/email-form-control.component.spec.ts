import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFormControlComponent } from './email-form-control.component';

describe('EmailFormControlComponent', () => {
  let component: EmailFormControlComponent;
  let fixture: ComponentFixture<EmailFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

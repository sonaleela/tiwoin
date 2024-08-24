import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutControllerComponent } from './signout-controller.component';

describe('SignoutControllerComponent', () => {
  let component: SignoutControllerComponent;
  let fixture: ComponentFixture<SignoutControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignoutControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignoutControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

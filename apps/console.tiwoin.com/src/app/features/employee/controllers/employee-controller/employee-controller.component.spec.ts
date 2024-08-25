import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeControllerComponent } from './employee-controller.component';

describe('EmployeeControllerComponent', () => {
  let component: EmployeeControllerComponent;
  let fixture: ComponentFixture<EmployeeControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

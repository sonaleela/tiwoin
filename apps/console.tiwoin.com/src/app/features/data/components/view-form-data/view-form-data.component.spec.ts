import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormDataComponent } from './view-form-data.component';

describe('ViewFormDataComponent', () => {
  let component: ViewFormDataComponent;
  let fixture: ComponentFixture<ViewFormDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFormDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

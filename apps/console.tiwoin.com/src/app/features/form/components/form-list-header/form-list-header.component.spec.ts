import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListHeaderComponent } from './form-list-header.component';

describe('FormListHeaderComponent', () => {
  let component: FormListHeaderComponent;
  let fixture: ComponentFixture<FormListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormListHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

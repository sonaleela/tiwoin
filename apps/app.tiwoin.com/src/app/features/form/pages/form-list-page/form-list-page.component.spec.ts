import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListPageComponent } from './form-list-page.component';

describe('FormListPageComponent', () => {
  let component: FormListPageComponent;
  let fixture: ComponentFixture<FormListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

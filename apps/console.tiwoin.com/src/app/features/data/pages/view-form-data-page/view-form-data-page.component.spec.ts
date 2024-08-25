import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormDataPageComponent } from './view-form-data-page.component';

describe('ViewFormDataPageComponent', () => {
  let component: ViewFormDataPageComponent;
  let fixture: ComponentFixture<ViewFormDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFormDataPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFormDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

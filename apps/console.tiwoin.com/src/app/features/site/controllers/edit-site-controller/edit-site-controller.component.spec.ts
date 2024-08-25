import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSiteControllerComponent } from './edit-site-controller.component';

describe('EditSiteControllerComponent', () => {
  let component: EditSiteControllerComponent;
  let fixture: ComponentFixture<EditSiteControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSiteControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSiteControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSitePageComponent } from './edit-site-page.component';

describe('EditSitePageComponent', () => {
  let component: EditSitePageComponent;
  let fixture: ComponentFixture<EditSitePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSitePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

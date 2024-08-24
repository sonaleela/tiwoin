import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteListPageComponent } from './site-list-page.component';

describe('SiteListPageComponent', () => {
  let component: SiteListPageComponent;
  let fixture: ComponentFixture<SiteListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteListPageComponent]
    });
    fixture = TestBed.createComponent(SiteListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

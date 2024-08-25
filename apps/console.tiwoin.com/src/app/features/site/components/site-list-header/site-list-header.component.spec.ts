import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteListHeaderComponent } from './site-list-header.component';

describe('SiteListHeaderComponent', () => {
  let component: SiteListHeaderComponent;
  let fixture: ComponentFixture<SiteListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteListHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

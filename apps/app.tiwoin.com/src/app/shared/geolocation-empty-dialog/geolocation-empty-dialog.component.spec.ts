import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationEmptyDialogComponent } from './geolocation-empty-dialog.component';

describe('GeolocationEmptyDialogComponent', () => {
  let component: GeolocationEmptyDialogComponent;
  let fixture: ComponentFixture<GeolocationEmptyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeolocationEmptyDialogComponent]
    });
    fixture = TestBed.createComponent(GeolocationEmptyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceEmptyDialogComponent } from './geofence-empty-dialog.component';

describe('GeofenceEmptyDialogComponent', () => {
  let component: GeofenceEmptyDialogComponent;
  let fixture: ComponentFixture<GeofenceEmptyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeofenceEmptyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeofenceEmptyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

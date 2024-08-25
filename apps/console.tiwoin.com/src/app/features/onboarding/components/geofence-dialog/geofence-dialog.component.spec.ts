import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceDialogComponent } from './geofence-dialog.component';

describe('GeofenceDialogComponent', () => {
  let component: GeofenceDialogComponent;
  let fixture: ComponentFixture<GeofenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeofenceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeofenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

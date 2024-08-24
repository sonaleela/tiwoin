import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhotoFormComponent } from './profile-photo-form.component';

describe('ProfilePhotoFormComponent', () => {
  let component: ProfilePhotoFormComponent;
  let fixture: ComponentFixture<ProfilePhotoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePhotoFormComponent]
    });
    fixture = TestBed.createComponent(ProfilePhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

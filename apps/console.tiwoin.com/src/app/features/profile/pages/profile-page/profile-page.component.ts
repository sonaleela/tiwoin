import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-profile-page',
    template: `<sonaleela-profile-controller></sonaleela-profile-controller>`,
    styles: [`:host {@apply block;}`,],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent { }

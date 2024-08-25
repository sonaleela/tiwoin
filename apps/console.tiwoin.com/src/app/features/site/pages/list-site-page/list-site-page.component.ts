import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-list-site-page',
    template: '<sonaleela-list-site-controller></sonaleela-list-site-controller>',
    styles: [`:host {@apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSitePageComponent { }

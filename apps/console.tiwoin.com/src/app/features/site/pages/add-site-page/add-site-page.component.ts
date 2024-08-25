import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-add-site-page',
    template: '<sonaleela-add-site-controller></sonaleela-add-site-controller>',
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSitePageComponent { }

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-work-item-list-page',
    template: `<sonaleela-work-item-list-controller></sonaleela-work-item-list-controller>`,
    styles: [':host { @apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkItemListPageComponent { }

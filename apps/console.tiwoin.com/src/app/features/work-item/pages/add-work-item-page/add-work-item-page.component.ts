import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-add-work-item-page',
    template: `<sonaleela-add-work-item-controller></sonaleela-add-work-item-controller>`,
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorkItemPageComponent { }

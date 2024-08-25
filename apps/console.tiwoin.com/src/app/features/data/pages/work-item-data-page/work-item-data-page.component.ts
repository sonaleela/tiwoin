import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-work-item-data-page',
    template: `<sonaleela-work-item-data-controller></sonaleela-work-item-data-controller>`,
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemDataPageComponent { }

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-view-work-item-data-page',
    template: `<sonaleela-view-work-item-data-controller></sonaleela-view-work-item-data-controller>`,
    styles: `:host {@apply block h-full;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewWorkItemDataPageComponent { }

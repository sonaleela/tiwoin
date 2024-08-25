import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-edit-work-item-data-page',
    template: `<sonaleela-edit-work-item-data-controller></sonaleela-edit-work-item-data-controller>`,
    styles: `:host { @apply block;}`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWorkItemDataPageComponent { }

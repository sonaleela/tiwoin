import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-list-user-page',
    template: `<sonaleela-user-list-controller></sonaleela-user-list-controller>`,
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUserPageComponent { }

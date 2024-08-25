import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sonaleela-layout-empty',
    template: `<ng-content></ng-content>`,
    styles: [':host { @apply block h-full}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutEmptyComponent { }

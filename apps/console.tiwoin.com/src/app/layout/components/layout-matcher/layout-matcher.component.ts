import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LayoutType } from '@models';

@Component({
    selector: 'sonaleela-layout-matcher',
    templateUrl: './layout-matcher.component.html',
    styles: [':host { @apply block h-full; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LayoutMatcherComponent {
    readonly layout = input<LayoutType>(LayoutType.EMPTY);
    layoutTypes = LayoutType;
}

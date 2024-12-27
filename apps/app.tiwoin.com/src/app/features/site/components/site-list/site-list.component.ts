import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SiteModel } from '@models';

@Component({
    selector: 'tiwoin-site-list',
    templateUrl: `./site-list.component.html`,
    styles: [`:host { @apply block bg-gray-100 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SiteListComponent {
    readonly list = input<SiteModel[] | null>(null);
    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(null);
}

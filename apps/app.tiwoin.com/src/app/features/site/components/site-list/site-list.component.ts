import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SiteModel } from '@models';

@Component({
    selector: 'tiwoin-site-list',
    templateUrl: `./site-list.component.html`,
    styles: [`:host { @apply block bg-gray-100 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteListComponent {
    @Input() list: SiteModel[] | null = null;
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;
}

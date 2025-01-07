import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { SiteModel } from '@models';

@Component({
    selector: 'sonaleela-site-list-card',
    templateUrl: './site-list-card.component.html',
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SiteListCardComponent {
    readonly siteList = input<SiteModel[]>([]);
    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);
    displayedColumns = ['name', 'actions'];

    readonly delete = output<string>();
}

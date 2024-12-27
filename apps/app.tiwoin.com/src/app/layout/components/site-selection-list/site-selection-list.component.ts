import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SiteModel } from '@models';

@Component({
    selector: 'tiwoin-site-list',
    templateUrl: './site-selection-list.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SiteSelectionListComponent {
    readonly list = input<SiteModel[] | null>(null);
    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);
    readonly activeSite = input<SiteModel | null>(null);

    @Output() selectedSite = new EventEmitter<SiteModel>();

    siteControl = new FormControl(this.activeSite());

    constructor() {
        this.siteControl.valueChanges.subscribe((site: SiteModel | null) => {
            if (!site) return;
            this.selectedSite.emit(site);
        });
    }
}

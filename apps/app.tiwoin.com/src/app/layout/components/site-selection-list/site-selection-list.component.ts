import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SiteModel } from '@models';

@Component({
    selector: 'tiwoin-site-list',
    templateUrl: './site-selection-list.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteSelectionListComponent {
    @Input() list: SiteModel[] | null = null;
    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;
    @Input() activeSite: SiteModel | null = null;

    @Output() selectedSite = new EventEmitter<SiteModel>();

    siteControl = new FormControl(this.activeSite);

    constructor() {
        this.siteControl.valueChanges.subscribe((site: SiteModel | null) => {
            if (!site) return;
            this.selectedSite.emit(site);
        });
    }
}

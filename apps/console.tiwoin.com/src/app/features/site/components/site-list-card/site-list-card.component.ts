import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SiteModel } from '@models';

@Component({
    selector: 'sonaleela-site-list-card',
    templateUrl: './site-list-card.component.html',
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteListCardComponent {
    @Input() siteList: SiteModel[] = [];
    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;
    displayedColumns = ['name', 'actions'];

    @Output() delete = new EventEmitter<string>();
}

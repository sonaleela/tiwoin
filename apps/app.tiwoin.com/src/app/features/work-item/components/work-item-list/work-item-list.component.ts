import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WorkItemModal } from '@models';

@Component({
    selector: 'tiwoin-work-item-list',
    templateUrl: './work-item-list.component.html',
    styles: [`:host { @apply block bg-gray-100 h-full pb-24 overflow-y-auto;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemListComponent {
    @Input() list: WorkItemModal[] | null = null;
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;
}

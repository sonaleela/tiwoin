import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WorkItemModal } from '@models';

@Component({
    selector: 'tiwoin-work-item-list',
    templateUrl: './work-item-list.component.html',
    styles: [`:host { @apply block bg-gray-100 h-full pb-24 overflow-y-auto;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WorkItemListComponent {
    readonly list = input<WorkItemModal[] | null>(null);
    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(null);
}

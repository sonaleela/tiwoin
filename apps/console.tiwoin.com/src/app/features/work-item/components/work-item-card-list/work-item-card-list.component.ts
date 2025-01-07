import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-work-item-card-list',
    templateUrl: './work-item-card-list.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WorkItemCardListComponent {
    readonly workItems = input<any[]>([]);
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>(null);
    readonly longDateFormat = input<string>('');
    
    readonly delete = output<string>();
    displayedColumns = ['name', 'description', 'unitCost', 'createdAt', 'actions'];
}

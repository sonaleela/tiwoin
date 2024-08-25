import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sonaleela-work-item-card-list',
    templateUrl: './work-item-card-list.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkItemCardListComponent {
    @Input() workItems: any[] = [];
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = null;
    @Input() longDateFormat: string = '';
    
    @Output() delete = new EventEmitter<string>();
    displayedColumns = ['name', 'description', 'unitCost', 'createdAt', 'actions'];
}

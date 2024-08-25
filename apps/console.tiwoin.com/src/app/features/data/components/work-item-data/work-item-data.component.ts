import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sonaleela-work-item-data',
    templateUrl: './work-item-data.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemDataComponent {
    @Input() activeWorkItem: any;
    @Input() workItemList: any[] = [];
    @Input() error: string | null = '';
    @Input() isPending: boolean | null = false;
    @Input() longDateFormat: string = '';

    @Output() selectGeoLocationData: EventEmitter<any> = new EventEmitter();
    @Output() sortBy: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['expand', 'submittedBy', 'name', 'count', 'site', 'approval', 'submittedAt', 'geoLocation', 'edit'];

    sortDataBy(data: any) {
        this.sortBy.emit(data);
    }
}

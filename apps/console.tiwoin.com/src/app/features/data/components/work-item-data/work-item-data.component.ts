import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-work-item-data',
    templateUrl: './work-item-data.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WorkItemDataComponent {
    readonly activeWorkItem = input<any>();
    readonly workItemList = input<any[]>([]);
    readonly error = input<string | null>('');
    readonly isPending = input<boolean | null>(false);
    readonly longDateFormat = input<string>('');

    readonly selectGeoLocationData = output();
    readonly sortBy = output<any>();

    displayedColumns: string[] = ['expand', 'submittedBy', 'name', 'count', 'site', 'approval', 'submittedAt', 'geoLocation', 'edit'];

    sortDataBy(data: any) {
        this.sortBy.emit(data);
    }
}

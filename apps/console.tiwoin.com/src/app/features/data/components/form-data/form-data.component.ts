import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-form-data',
    templateUrl: './form-data.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormDataComponent {
    readonly activeForm = input<any>();
    readonly formList = input<any[]>([]);
    readonly error = input<string | null>('');
    readonly isPending = input<boolean | null>(false);
    readonly longDateFormat = input<string>('');

    readonly selectFormData = output();
    readonly selectGeoLocationData = output();
    readonly sortBy = output<any>();

    displayedColumns: string[] = ['expand', 'submittedBy', 'name', 'site', 'approval', 'submittedAt', 'geoLocation', 'edit'];

    sortDataBy(data: any) {
        this.sortBy.emit(data);
    }
}

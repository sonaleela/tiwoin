import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sonaleela-form-data',
    templateUrl: './form-data.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDataComponent {
    @Input() activeForm: any;
    @Input() formList: any[] = [];
    @Input() error: string | null = '';
    @Input() isPending: boolean | null = false;
    @Input() longDateFormat: string = '';

    @Output() selectFormData: EventEmitter<any> = new EventEmitter();
    @Output() selectGeoLocationData: EventEmitter<any> = new EventEmitter();
    @Output() sortBy: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['expand', 'submittedBy', 'name', 'site', 'approval', 'submittedAt', 'geoLocation', 'edit'];

    sortDataBy(data: any) {
        this.sortBy.emit(data);
    }
}

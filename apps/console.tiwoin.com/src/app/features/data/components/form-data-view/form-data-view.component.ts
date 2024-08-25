import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sonaleela-form-data-view',
    templateUrl: './form-data-view.component.html',
    styles: [`:host { @apply flex flex-col py-6 gap-6 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDataViewComponent {
    @Input() data: any;
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;

    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() approve: EventEmitter<any> = new EventEmitter();

    getValue(field: any) {
        if (field.type === 'CHECKBOX')
            return field.value && field.value?.map((v: any) => v.label).join(', ');
        else
            return field.value;
    }
}

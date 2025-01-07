import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-form-data-view',
    templateUrl: './form-data-view.component.html',
    styles: [`:host { @apply flex flex-col py-6 gap-6 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormDataViewComponent {
    readonly data = input<any>();
    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(null);

    readonly close = output<boolean>();
    readonly approve = output();

    getValue(field: any) {
        if (field.type === 'CHECKBOX')
            return field.value && field.value?.map((v: any) => v.label).join(', ');
        else
            return field.value;
    }
}

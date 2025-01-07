import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { FormModal } from '@models';

@Component({
    selector: 'sonaleela-form-list-table',
    templateUrl: './form-list-table.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormListTableComponent {
    readonly list = input<FormModal[]>([]);
    displayedColumns = ['name', 'fields', 'options'];

    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(null);

    readonly delete = output<string>();
}

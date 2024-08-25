import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormModal } from '@models';

@Component({
    selector: 'sonaleela-form-list-table',
    templateUrl: './form-list-table.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormListTableComponent {
    @Input() list: FormModal[] = [];
    displayedColumns = ['name', 'fields', 'options'];

    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;

    @Output() delete = new EventEmitter<string>();
}

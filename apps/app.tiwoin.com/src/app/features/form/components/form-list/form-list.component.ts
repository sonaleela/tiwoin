import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormModal } from '@models';

@Component({
    selector: 'tiwoin-form-list',
    templateUrl: './form-list.component.html',
    styles: [`:host { @apply block bg-gray-100 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormListComponent {
    @Input() list: FormModal[] | null = null;
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;
}

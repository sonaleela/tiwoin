import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormModal } from '@models';

@Component({
    selector: 'tiwoin-form-list',
    templateUrl: './form-list.component.html',
    styles: [`:host { @apply block bg-gray-100 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormListComponent {
    /**
     * Input
     */
    readonly list = input<FormModal[] | null>(null);
    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(null);
}

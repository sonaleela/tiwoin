import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormModal } from '@models';

@Component({
    selector: 'tiwoin-form-view',
    templateUrl: './form-view.component.html',
    styles: `:host { @apply block p-6; }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormViewComponent {
    readonly data = input<FormModal | null>();
}

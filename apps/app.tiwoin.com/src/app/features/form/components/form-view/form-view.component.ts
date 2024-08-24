import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormModal } from '@models';

@Component({
    selector: 'tiwoin-form-view',
    templateUrl: './form-view.component.html',
    styles: `:host { @apply block p-6; }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormViewComponent {
    @Input() data: FormModal | null | undefined;
}

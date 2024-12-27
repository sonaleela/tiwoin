import { ChangeDetectionStrategy, Component, OnInit, input } from '@angular/core';

@Component({
    selector: 'tiwoin-form-submission-list',
    templateUrl: './form-submission-list.component.html',
    styles: [`:host { @apply block bg-gray-100 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormSubmissionListComponent {
    /**
     * Input
     */
    readonly list = input<any[] | null>(null);
    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(null);
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'tiwoin-work-item-submission-list',
    templateUrl: './work-item-submission-list.component.html',
    styles: [`:host { @apply block pb-24 overflow-y-auto;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WorkItemSubmissionListComponent {
    /**
     * Input
     */
    readonly list = input<any[] | null>(null);
    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(null);
}

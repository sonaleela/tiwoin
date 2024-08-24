import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'tiwoin-work-item-submission-list',
    templateUrl: './work-item-submission-list.component.html',
    styles: [`:host { @apply block pb-24 overflow-y-auto;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemSubmissionListComponent {
    @Input() list: any[] | null = null;
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;
}

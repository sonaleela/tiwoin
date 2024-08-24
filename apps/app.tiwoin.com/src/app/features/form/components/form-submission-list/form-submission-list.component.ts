import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'tiwoin-form-submission-list',
    templateUrl: './form-submission-list.component.html',
    styles: [`:host { @apply block bg-gray-100 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSubmissionListComponent {
    @Input() list: any[] | null = null;
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'tiwoin-document-list',
    templateUrl: './document-list.component.html',
    styles: [`:host { @apply flex flex-col gap-4 min-h-full bg-gray-75 pt-5 px-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DocumentListComponent {
    /**
     * Input
     */
    readonly list = input<any[] | null>([]);
    readonly requestList = input<any[] | null>([]);

    /**
     * Output
     */
    readonly requestUpload = output<{ id: string, name: string }>();
}

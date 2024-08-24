import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'tiwoin-document-list',
    templateUrl: './document-list.component.html',
    styles: [`:host { @apply flex flex-col gap-4 min-h-full bg-gray-75 pt-5 px-6;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListComponent {
    @Input() list: any[] | null = [];
    @Input() requestList: any[] | null = [];

    @Output() requestUpload = new EventEmitter();
}

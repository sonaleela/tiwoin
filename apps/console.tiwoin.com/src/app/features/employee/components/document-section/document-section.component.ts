import { Component, OnInit, ChangeDetectionStrategy, input, output } from '@angular/core';
import { DocumentModel, EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-document-section',
    templateUrl: './document-section.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DocumentSectionComponent {
    readonly list = input<DocumentModel[] | null>(null);
    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);
    
    readonly add = output<boolean>();
    readonly request = output<boolean>();
}

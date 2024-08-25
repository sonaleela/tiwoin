import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DocumentModel, EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-document-section',
    templateUrl: './document-section.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentSectionComponent {
    @Input() list: DocumentModel[] | null = null;
    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;
    
    @Output() add = new EventEmitter<boolean>();
    @Output() request = new EventEmitter<boolean>();
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sonaleela-view-form-data',
    templateUrl: './view-form-data.component.html',
    styles: [`:host { @apply flex flex-col py-6 gap-6 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewFormDataComponent {
    @Input() data: any;
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = null;

    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() approve: EventEmitter<any> = new EventEmitter();
}

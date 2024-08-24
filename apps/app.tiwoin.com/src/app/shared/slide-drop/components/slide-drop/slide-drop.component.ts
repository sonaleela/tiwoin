import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'tiwoin-slide-drop',
    templateUrl: './slide-drop.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideDropComponent {
    @Input() entry: { name: string, type: string } | null = null;
    @Input() isDisabled: boolean = false;

    @Output() dropped = new EventEmitter<boolean>();

    source: string[] = ['event'];
    target: string[] = [];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
            this.dropped.emit(true);
        }
    }
}

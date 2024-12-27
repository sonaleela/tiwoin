import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, input } from '@angular/core';

@Component({
    selector: 'tiwoin-slide-drop',
    templateUrl: './slide-drop.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SlideDropComponent {
    readonly entry = input<{
        name: string;
        type: string;
    } | null>(null);
    readonly isDisabled = input<boolean>(false);

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

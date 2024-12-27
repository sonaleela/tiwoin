import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

interface Entry {
    name: string,
    type: string,
}

@Component({
    selector: 'tiwoin-slide-drop',
    templateUrl: './slide-drop.component.html',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        DragDropModule,
    ],
    standalone: true,
})
export class SlideDropComponent {
    /**
     * Input
     */
    readonly entry = input<Entry | null>(null);
    readonly isDisabled = input<boolean>(false);

    /**
     * Output
     */
    readonly dropped = output<boolean>();

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

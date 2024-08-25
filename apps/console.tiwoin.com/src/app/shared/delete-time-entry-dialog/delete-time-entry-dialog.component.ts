import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SluiButtonModule } from '@sonaleela/ui';

@Component({
    standalone: true,
    selector: 'sonaleela-delete-time-entry-dialog',
    templateUrl: './delete-time-entry-dialog.component.html',
    styles: [`:host { @apply flex flex-col bg-white rounded-3xl w-[540px]; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SluiButtonModule],
})
export class DeleteTimeEntryDialogComponent {
    constructor(private dialogRef: DialogRef<any>, @Inject(DIALOG_DATA) public data: any[]) { }

    close() {
        this.dialogRef.close();
    }

    delete() {
        this.dialogRef.close(this.data);
    }
}

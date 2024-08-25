import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SluiButtonModule } from "@sonaleela/ui";

@Component({
    standalone: true,
    selector: 'sonaleela-geofence-empty-dialog',
    templateUrl: './geofence-empty-dialog.component.html',
    styles: [`:host { @apply flex flex-col bg-white rounded-3xl w-[540px]; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SluiButtonModule]
})
export class GeofenceEmptyDialogComponent {

    constructor(private dialogRef: DialogRef<any>, @Inject(DIALOG_DATA) public data: any[]) { }

    close() {
        this.dialogRef.close();
    }

    delete() {
        this.dialogRef.close(this.data);
    }
}

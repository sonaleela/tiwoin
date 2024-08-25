import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-geofence-dialog',
  templateUrl: 'geofence-dialog.component.html',
  styles: [`:host { @apply flex flex-col bg-white rounded-3xl w-[540px]; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeofenceDialogComponent {

  constructor(private dialogRef: DialogRef<any>, @Inject(DIALOG_DATA) public data: any[]) { }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(this.data);
  }
}

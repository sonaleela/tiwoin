import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'sonaleela-dialog-delete',
  templateUrl: 'dialog-delete.component.html',
  styles: [`:host { @apply flex flex-col bg-white rounded-3xl w-[540px]; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDeleteComponent {

  constructor(private dialogRef: DialogRef<any>, @Inject(DIALOG_DATA) public data: { id: string }) { }

  close() {
    this.dialogRef.close('');
  }

  delete() {
    this.dialogRef.close(this.data.id);
  }
}

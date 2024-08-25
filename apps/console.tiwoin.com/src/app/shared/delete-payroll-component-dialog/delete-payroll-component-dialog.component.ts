import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { SluiButtonModule } from "@sonaleela/ui";

@Component({
    standalone: true,
    selector: 'sonaleela-delete-payroll-component-dialog',
    templateUrl: './delete-payroll-component-dialog.component.html',
    styles: [`:host { @apply flex flex-col bg-white rounded-3xl w-[540px]; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SluiButtonModule],
})
export class DeletePayrollComponentDialogComponent {
    constructor(private dialogRef: DialogRef<any>, @Inject(DIALOG_DATA) public data: any[]) { }

    close() {
        this.dialogRef.close();
    }

    delete() {
        this.dialogRef.close(this.data);
    }
}

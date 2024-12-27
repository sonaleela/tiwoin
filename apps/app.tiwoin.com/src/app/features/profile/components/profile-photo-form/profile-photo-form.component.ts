import { ChangeDetectionStrategy, Component, Input, input, output } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'tiwoin-profile-photo-form',
    templateUrl: './profile-photo-form.component.html',
    styles: [`:host { @apply relative flex flex-col h-full bg-gray-100 pt-20 pb-12;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProfilePhotoFormComponent {
    /**
     * Input
     */
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');

    /**
     * Output
     */
    readonly toggleForm = output<boolean>();
    readonly upload = output<File>();

    file: File | null = null;

    uploadFile() {
        if (!this.file) return;
        this.upload.emit(this.file)
    }

    fileChange(event: Event) {
        const files: FileList | null = (<HTMLInputElement>event?.target).files;
        this.file = files![0];
    }
}

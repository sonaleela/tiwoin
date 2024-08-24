import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'tiwoin-profile-photo-form',
    templateUrl: './profile-photo-form.component.html',
    styles: [`:host { @apply relative flex flex-col h-full bg-gray-100 pt-20 pb-12;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePhotoFormComponent {
    @Input() set profile(profile: EmployeeModel | null | any) {
        if (!profile) return;
    }
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';

    @Output() toggleForm = new EventEmitter<boolean>();
    @Output() upload = new EventEmitter<File>();
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

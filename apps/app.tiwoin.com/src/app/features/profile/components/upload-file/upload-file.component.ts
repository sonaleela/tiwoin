import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'tiwoin-upload-file',
    templateUrl: './upload-file.component.html',
    styles: [`:host { @apply relative flex flex-col h-full bg-gray-100 pt-20 pb-12;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent {
    @Input() error: string | null = null;
    @Input() isPending: boolean | null = false;
    @Output() close = new EventEmitter();
    @Output() upload = new EventEmitter<File>();
    file: File | undefined;

    uploadFile() {
        if (!this.file) return;
        this.upload.emit(this.file)
        // this.storageService.uploadFile('myfile1', this.file).subscribe(res => console.log({ res }))
    }

    fileChange(event: Event) {
        const files: FileList | null = (<HTMLInputElement>event?.target).files;
        this.file = files![0];
    }
}

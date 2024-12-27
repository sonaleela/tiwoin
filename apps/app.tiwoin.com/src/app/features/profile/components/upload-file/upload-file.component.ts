import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'tiwoin-upload-file',
    templateUrl: './upload-file.component.html',
    styles: [`:host { @apply relative flex flex-col h-full bg-gray-100 pt-20 pb-12;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UploadFileComponent {
    /**
     * Input
     */
    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(false);

    /**
     * Output
     */
    readonly close = output<boolean>();
    readonly upload = output<File>();

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

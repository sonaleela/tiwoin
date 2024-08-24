import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, Optional } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { v4 as uuid } from "uuid";
import { DynamicField } from '../field';
import { StorageService, StorageServiceInterface } from '../../config';

@Component({
    selector: 'slui-file-field',
    templateUrl: './file-field.component.html',
    styles: [`:host {@apply block;}`, `.bg-blue-400 {background-color: var(--slui-button-cta-color);}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFieldComponent implements DynamicField {
    private _data: any;
    @Input() set data(data: any) {
        if (!data) return;
        this._data = data;
        this.control.patchValue(data?.value || '');
    }
    get data() { return this._data; }

    valueChange: Subject<File | any> = new Subject();

    subscriptions: any[] = [];
    control: FormControl;
    files: any[] = [];

    constructor(
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        @Inject(StorageService) @Optional() private storageServive: StorageServiceInterface,
    ) {
        this.control = this.fb.control<any>(null);

        const subscription = this.control.valueChanges.subscribe(value => {
            this.valueChange.next({
                ...this.data,
                value,
            });
        });
        this.subscriptions.push(subscription);
    }

    addFile(event: Event) {
        const file = (<HTMLInputElement>event?.target)?.files?.item(0);
        if (!file) return;
        (<HTMLInputElement | any>event?.target).value = null;

        const fileName = `${uuid()}.${file?.name.split('.')?.pop()}`;
        const filePayload = {
            fieldId: this.data?.id,
            fileName,
            size: (<File>file).size,
            type: (<File>file).type,
            extension: file.name.split('.')?.pop(),
            name: (<File>file).name,
            isUploading: true,
            progress: 0,
        }
        this.files.push(filePayload);
        const progressCb = (progress: any) => {
            filePayload.progress = Math.trunc((progress.loaded * 100) / progress.total);
            this.cdr.markForCheck();
        }
        this.storageServive
            .uploadFile(fileName, file, progressCb)
            .subscribe(response => {
                filePayload.isUploading = false;
                this.cdr.markForCheck();
                this.control.setValue(this.files);
            });
    }

    removeFile(index: number) {
        let files: any[] = this.control.value;
        files.splice(index, 1);
        this.cdr.markForCheck();
        this.control.setValue(files.length ? files : null);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}

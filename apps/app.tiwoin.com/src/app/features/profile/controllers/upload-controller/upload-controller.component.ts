import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";

@Component({
    selector: 'tiwoin-upload-controller',
    template: `<tiwoin-upload-file 
        [error]="error$ | async" 
        [isPending]="isPending$ | async" 
        (close)="close($event)" 
        (upload)="upload($event)"></tiwoin-upload-file>`,
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadControllerComponent {
    private store: Store = inject(Store);
    isPending$ = this.store.select(fromStore.selectIsDocumentUploadPending);
    error$ = this.store.select(fromStore.selectDocumentUploadError);


    close(_: any) {
        this.store.dispatch(fromStore.UnsetDocumentRequest());
    }

    upload(file: File) {
        this.store.dispatch(fromStore.UploadDocumentBegin({ file }));
    }
}

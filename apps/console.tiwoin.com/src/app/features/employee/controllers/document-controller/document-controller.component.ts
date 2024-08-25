import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { FetchEmployee } from '../employee.class';
import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-document-controller',
    templateUrl: './document-controller.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentControllerComponent extends FetchEmployee {
    override store: Store = inject(Store);

    isAddForm$ = this.store.select(fromStore.selectIsAddDocumentForm);
    isRequestForm$ = this.store.select(fromStore.selectIsRequestDocumentForm);
    isRequestDocumentPending$ = this.store.select(fromStore.selectIsRequestDocumentPending);
    requestDocumentError$ = this.store.select(fromStore.selectRequestDocumentError);

    documentList$ = this.store.select(fromStore.selectDocumentList);
    isDocumentListPending$ = this.store.select(fromStore.selectIsDocumentListPending);
    documentError$ = this.store.select(fromStore.selectDocumentListError);

    constructor() {
        super();
        this.store.dispatch(fromStore.FetchDocumentListBegin());
    }

    add(flag: boolean) {
        this.store.dispatch(fromStore.ToggleAddDocumenForm({ flag }));
    }

    cancelAddForm() {
        this.store.dispatch(fromStore.ToggleAddDocumenForm({ flag: false }));
    }

    request(flag: boolean) {
        this.store.dispatch(fromStore.ToggleRequestDocumentForm({ flag }));
    }

    cancelRequestForm() {
        this.store.dispatch(fromStore.ToggleRequestDocumentForm({ flag: false }));
    }

    submitRequestForm(body: any) {
        this.store.dispatch(fromStore.RequestDocumentBegin({ body }));
    }
}

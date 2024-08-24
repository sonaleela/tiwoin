import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";
import * as fromRootStore from "@store";
import { map, tap } from 'rxjs/operators';

@Component({
	selector: 'tiwoin-document-controller',
	templateUrl: `./document-controller.component.html`,
	styles: [`:host { @apply block h-full;}`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentControllerComponent {
	private store: Store = inject(Store);
	uploadRequest$ = this.store.select(fromStore.selectDocumentRequest);

	documentList$ = this.store.select(fromRootStore.selectDocumentList);
	uploadedDocucments$ = this.documentList$.pipe(map((list: any[]) => list.filter(document => !!document.fileName)));
	requestedDocuments$ = this.documentList$.pipe(map((list: any[]) => list.filter(document => !document.fileName)));
	isDocumentListPending$ = this.store.select(fromRootStore.selectIsDocumentListPending);


	requestUpload(request: { id: string, name: string }) {
		this.store.dispatch(fromStore.SetDocumentRequest({ request }));
	}

	back() {
		this.store.dispatch(fromRootStore.Back());
	}
}

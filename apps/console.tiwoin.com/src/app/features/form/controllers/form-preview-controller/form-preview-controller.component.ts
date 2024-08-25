import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";

@Component({
    selector: 'sonaleela-form-preview-controller',
    template: '<sonaleela-dynamic-form [data]="data$ | async"></sonaleela-dynamic-form>',
    styles: [`:host { @apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPreviewControllerComponent {
    private store: Store = inject(Store);

    data$ = this.store.select(fromRootStore.selectActiveForm);;
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { v4 as uuid } from "uuid";

import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-form-builder-controller',
    templateUrl: './form-builder-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderControllerComponent {
    private store: Store = inject(Store);

    isPending$ = this.store.select(fromStore.selectIsAddFormPending);
    error$ = this.store.select(fromStore.selectEditFormError);
    fields$ = this.store.select(fromStore.selectActiveFormFields);

    saveForm(body: any) {
        this.store.dispatch(fromStore.AddFormBegin({ body }));
    }

    editField(field: any) {
        this.store.dispatch(fromStore.SetActiveField({ field }));
    }

    copyField(field: any) {
        this.store.dispatch(fromStore.CopyField({ field }));
    }

    deleteField(field: any) {
        this.store.dispatch(fromStore.DeleteField({ field }));
    }
}

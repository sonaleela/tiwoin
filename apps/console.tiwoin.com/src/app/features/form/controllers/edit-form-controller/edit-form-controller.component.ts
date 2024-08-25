import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-edit-form-controller',
    templateUrl: './edit-form-controller.component.html',
    styles: [`:host { @apply flex flex-col h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFormControllerComponent {
    private store: Store = inject(Store);

    isEditPending$ = this.store.select(fromStore.selectIsEditFormPending);
    editError$ = this.store.select(fromStore.selectEditFormError);
    form$ = this.store.select(fromStore.selectActiveForm);

    saveForm(body: any) {
        this.store.dispatch(fromStore.UpdateFormBegin({ body }));
    }

    editField(field: any) {
        this.store.dispatch(fromStore.SetActiveField({ field }));
    }

    copyField(field: any) {
    }

    deleteField(field: any) {
        this.store.dispatch(fromStore.DeleteField({ field }));
    }
}

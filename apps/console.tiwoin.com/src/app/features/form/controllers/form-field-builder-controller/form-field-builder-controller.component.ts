import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormFieldTypeEnum } from '@models';
import { Store } from '@ngrx/store';
import { v4 as uuid } from "uuid";

import * as fromStore from "../../store";

@Component({
    selector: 'sonaleela-form-field-builder-controller',
    templateUrl: './form-field-builder-controller.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldBuilderControllerComponent {
    private store: Store = inject(Store);

    activeField$ = this.store.select(fromStore.selectActiveFormField);

    saveField(event: any) {
        const field = !!event?.id ? event : { ...event, id: uuid() };
        this.store.dispatch(fromStore.SaveField({ field }))
    }

    removeField(event: any) {
        this.store.dispatch(fromStore.UnsetActiveField());
    }

    addField(type: FormFieldTypeEnum) {
        this.store.dispatch(fromStore.SetActiveField({ field: { type: type || FormFieldTypeEnum.TEXT } }))
    }
}

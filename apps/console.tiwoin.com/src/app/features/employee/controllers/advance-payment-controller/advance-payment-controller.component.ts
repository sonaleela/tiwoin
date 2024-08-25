import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FetchEmployee } from '../employee.class';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";
import { emptyFilterObject } from "@shared";

@Component({
    selector: 'sonaleela-advance-payment-controller',
    templateUrl: `./advance-payment-controller.component.html`,
    styles: [':host {@apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancePaymentControllerComponent extends FetchEmployee {
    override store: Store = inject(Store);
    list$ = this.store.select(fromRootStore.selectAdvancePaymentData);
    total$ = this.store.select(fromRootStore.selectAdvancePaymentDataTotal);
    filterObject$ = this.store.select(fromRootStore.selectAdvancePaymentDataFilter).pipe(tap(filter => this.filter = filter));
    isDataPending$ = this.store.select(fromRootStore.selectIsAdvancePaymentDataPending);
    error$ = this.store.select(fromRootStore.selectAdvancePaymentDataError);
    longDateFormat$ = this.store.select(fromRootStore.selectLongDateFormat);

    isAddAdvancePaymentPending$ = this.store.select(fromStore.selectIsAddAdvancePaymentDataPending);
    addAdvancePaymentError$ = this.store.select(fromStore.selectAddAdvancePaymentError);

    filter: any;
    isForm$ = this.store.select(fromStore.selectIsAdvancePaymentForm);

    constructor() {
        super();
        this.store.dispatch(fromRootStore.FetchAdvancePaymentDataBegin({ filter: { ...emptyFilterObject() } }));
    }

    toggleForm(flag?: boolean) {
        this.store.dispatch(fromStore.ToggleAdvancePaymentForm({ flag }));
    }

    submit(body: any) {
        this.store.dispatch(fromStore.AddAdvancePaymentBegin({ body }));
    }
}

import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import * as fromRootStore from "@store";

@Component({
    selector: 'sonaleela-payroll-data-controller',
    templateUrl: './payroll-data-controller.component.html',
    styles: [`:host { @apply grid grid-rows-[64px,1fr] overflow-hidden h-full transition-all;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollDataControllerComponent {
    private store: Store = inject(Store);

    list$ = this.store.select(fromRootStore.selectPayrollData);
    filterObject$ = this.store.select(fromRootStore.selectPayrollDataFilter).pipe(tap(filter => this.filter = filter));
    isPending$ = this.store.select(fromRootStore.selectIsPayrollDataPending);
    error$ = this.store.select(fromRootStore.selectPayrollDataError);

    payrollData: any;
    filter: any;

    @HostBinding('class') get isSidePanel() { return !!this.payrollData ? 'grid-cols-[1fr,1fr]' : 'grid-cols-[1fr,36px]'; }

    dateSelect(date: string) {
        this.store.dispatch(fromRootStore.FilterPayrollData({
            filter: {
                ...this.filter,
                date: date,
            },
        }));
    }
}

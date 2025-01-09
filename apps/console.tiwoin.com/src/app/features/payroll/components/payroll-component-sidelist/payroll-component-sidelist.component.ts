import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PayrollComponentModel } from '@models';

@Component({
    selector: 'sonaleela-payroll-component-sidelist',
    templateUrl: './payroll-component-sidelist.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PayrollComponentSidelistComponent {
    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);
    readonly payrollComponentList = input<PayrollComponentModel[] | null>(null);
    readonly selectedIds = input<any[] | null>([]);
    readonly filterValue = input<{ [key: string]: any; } | null>({});

    readonly filterBy = output<{ [key: string]: any; }>();
    readonly selectComponentId = output<any[]>();
    readonly unSelectComponentId = output<any[]>();
    readonly toggleForm = output<boolean>();

    currentAppliedFilter: { [key: string]: any; } = {};
    currentSelectedIds: any[] = [];

    isComponentSelected = (id: any) => this.selectedIds()?.includes(id);

    filterComponent(filterValue: { [key: string]: any }) {
        if (!filterValue || JSON.stringify(filterValue) === '{}') this.currentAppliedFilter = {};
        this.currentAppliedFilter = { ...this.filterValue(), ...filterValue };

        this.filterBy.emit(this.currentAppliedFilter);
    }

    selectComponent(id: any) {
        if (!id) return;
        if (!this.selectedIds()) this.currentSelectedIds = [];

        if (this.isComponentSelected(id)) {
            this.unSelectComponentId.emit(id);
        } else {
            this.selectComponentId.emit(id);
        }
    }
}

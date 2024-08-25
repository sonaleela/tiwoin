import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PayrollComponentModel } from '@models';

@Component({
    selector: 'sonaleela-payroll-component-sidelist',
    templateUrl: './payroll-component-sidelist.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayrollComponentSidelistComponent {
    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;
    @Input() payrollComponentList: PayrollComponentModel[] | null = null;
    @Input() selectedIds: any[] | null = [];
    @Input() filterValue: { [key: string]: any } | null = {};

    @Output() filterBy = new EventEmitter<{ [key: string]: any }>();
    @Output() selectComponentId = new EventEmitter<any[]>();
    @Output() unSelectComponentId = new EventEmitter<any[]>();
    @Output() toggleForm = new EventEmitter<boolean>();

    isComponentSelected = (id: any) => this.selectedIds?.includes(id);

    filterComponent(filterValue: { [key: string]: any }) {
        if (!filterValue || JSON.stringify(filterValue) === '{}') this.filterValue = {};
        this.filterValue = { ...this.filterValue, ...filterValue };

        this.filterBy.emit(this.filterValue);
    }

    selectComponent(id: any) {
        if (!id) return;
        if (!this.selectedIds) this.selectedIds = [];

        if (this.isComponentSelected(id)) {
            this.unSelectComponentId.emit(id);
        } else {
            this.selectComponentId.emit(id);
        }
    }
}

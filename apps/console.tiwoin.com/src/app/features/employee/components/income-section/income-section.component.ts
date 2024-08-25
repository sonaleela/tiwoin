import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-income-section',
    templateUrl: './income-section.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeSectionComponent {
    @Input() employee?: EmployeeModel | null;
}

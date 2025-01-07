import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-income-section',
    templateUrl: './income-section.component.html',
    styles: [':host { @apply block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class IncomeSectionComponent {
    readonly employee = input<EmployeeModel | null>();
}

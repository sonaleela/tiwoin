import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-side-nav',
    templateUrl: './side-nav.component.html',
    styles: [':host { @apply bg-gray-75 block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
    @Input() employee?: EmployeeModel | null;
}

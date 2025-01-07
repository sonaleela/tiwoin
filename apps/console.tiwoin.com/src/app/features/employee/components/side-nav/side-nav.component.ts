import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'sonaleela-side-nav',
    templateUrl: './side-nav.component.html',
    styles: [':host { @apply bg-gray-75 block; }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SideNavComponent {
    readonly employee = input<EmployeeModel | null>();
}

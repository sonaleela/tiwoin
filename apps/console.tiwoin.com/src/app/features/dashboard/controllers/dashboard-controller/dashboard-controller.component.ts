import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-dashboard-controller',
    templateUrl: './dashboard-controller.component.html',
    styles: [`:host { @apply block h-full p-6; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardControllerComponent { }

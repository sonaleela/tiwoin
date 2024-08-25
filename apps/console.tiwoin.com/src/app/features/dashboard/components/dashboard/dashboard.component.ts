import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [`:host { @apply block h-full;}`,],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent { }

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'sonaleela-dashboard-page',
    template: `<sonaleela-dashboard-controller></sonaleela-dashboard-controller>`,
    styles: [`:host { @apply block h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent { }

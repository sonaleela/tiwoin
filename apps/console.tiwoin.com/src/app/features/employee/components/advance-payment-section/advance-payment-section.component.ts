import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'sonaleela-advance-payment-section',
    templateUrl: `./advance-payment-section.component.html`,
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancePaymentSectionComponent {
    @Input() list: any[] = [];
    @Input() error: string | null = '';
    @Input() longDateFormat: string = '';

    displayedColumns: string[] = ['date', 'amount', 'note'];
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'sonaleela-advance-payment-section',
    templateUrl: `./advance-payment-section.component.html`,
    styles: [':host {@apply block;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AdvancePaymentSectionComponent {
    readonly list = input<any[]>([]);
    readonly error = input<string | null>('');
    readonly longDateFormat = input<string>('');

    displayedColumns: string[] = ['date', 'amount', 'note'];
}

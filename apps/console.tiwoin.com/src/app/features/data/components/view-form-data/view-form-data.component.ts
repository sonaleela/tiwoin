import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-view-form-data',
    templateUrl: './view-form-data.component.html',
    styles: [`:host { @apply flex flex-col py-6 gap-6 h-full;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ViewFormDataComponent {
    readonly data = input<any>();
    readonly error = input<string | null>(null);
    readonly isPending = input<boolean | null>(null);

    readonly close = output<boolean>();
    readonly approve = output<any>();
}

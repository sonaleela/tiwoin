import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'tiwoin-profile',
    templateUrl: './profile.component.html',
    styles: [`:host {@apply flex flex-col py-6 gap-6 min-h-full bg-gray-100;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProfileComponent {
    /**
     * Input
     */
    readonly profile = input<EmployeeModel | null>(null);
    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);

    /**
     * Output
     */
    readonly toggleForm = output<boolean>();
    readonly togglePhotoForm = output<boolean>();
    readonly toggleContactForm = output<boolean>();
}

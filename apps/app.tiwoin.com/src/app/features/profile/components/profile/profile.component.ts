import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'tiwoin-profile',
    templateUrl: './profile.component.html',
    styles: [`:host {@apply flex flex-col py-6 gap-6 min-h-full bg-gray-100;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProfileComponent {
    readonly profile = input<EmployeeModel | null>(null);
    readonly isPending = input<boolean | null>(null);
    readonly error = input<string | null>(null);

    @Output() toggleForm = new EventEmitter<boolean>();
    @Output() togglePhotoForm = new EventEmitter();
    @Output() toggleContactForm = new EventEmitter<boolean>();
}

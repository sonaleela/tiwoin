import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeModel } from '@models';

@Component({
    selector: 'tiwoin-profile',
    templateUrl: './profile.component.html',
    styles: [`:host {@apply flex flex-col py-6 gap-6 min-h-full bg-gray-100;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
    @Input() profile: EmployeeModel | null = null;
    @Input() isPending: boolean | null = null;
    @Input() error: string | null = null;

    @Output() toggleForm = new EventEmitter<boolean>();
    @Output() togglePhotoForm = new EventEmitter();
    @Output() toggleContactForm = new EventEmitter<boolean>();
}

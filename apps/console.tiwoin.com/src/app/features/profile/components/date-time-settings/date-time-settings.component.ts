import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-date-time-settings',
    templateUrl: './date-time-settings.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimeSettingsComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() set profile(profile: any) {
        if (!profile) return;

        this.form.patchValue(profile);
    }
    @Input() isPending: boolean | null = false;
    @Input() error: string | null = null;

    @Output() updateProfile = new EventEmitter();

    today = new Date();
    form = this.formBuilder.group({
        dateFormat: ['dd MMM, yyyy', Validators.required],
        timeFormat: ['HH:mm', Validators.required],
    });

    submit() {
        this.updateProfile.emit(this.form.value);
    }
}

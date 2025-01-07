import { ChangeDetectionStrategy, Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'sonaleela-date-time-settings',
    templateUrl: './date-time-settings.component.html',
    styles: [`:host {@apply block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DateTimeSettingsComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    // TODO: Skipped for migration because:
    //  Accessor inputs cannot be migrated as they are too complex.
    @Input() set profile(profile: any) {
        if (!profile) return;

        this.form.patchValue(profile);
    }
    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>(null);

    readonly updateProfile = output<typeof this.form.value>();

    today = new Date();
    form = this.formBuilder.group({
        dateFormat: ['dd MMM, yyyy', Validators.required],
        timeFormat: ['HH:mm', Validators.required],
    });

    submit() {
        this.updateProfile.emit(this.form.value);
    }
}

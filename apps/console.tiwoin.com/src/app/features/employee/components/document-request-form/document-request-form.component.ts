import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, UntypedFormArray, Validators } from '@angular/forms';

import { AcceptType } from '@models';

@Component({
    selector: 'sonaleela-document-request-form',
    templateUrl: './document-request-form.component.html',
    styles: [`:host {display: block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DocumentRequestFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    readonly isPending = input<boolean | null>(false);
    readonly error = input<string | null>('');

    readonly submitForm = output<(typeof this.form.value)>();
    readonly cancel = output<boolean>();

    acceptType = [...AcceptType]
    form = this.formBuilder.nonNullable.group({
        name: this.formBuilder.nonNullable.control('', Validators.required),
        allowedType: this.formBuilder.nonNullable.array(AcceptType.map((_) => this.formBuilder.nonNullable.control<boolean | string>(false))),
    });

    get allowedType() {
        return <UntypedFormArray>this.form.get('allowedType');
    }

    submit() {
        if (this.form.invalid) return;

        this.submitForm.emit({
            ...this.form.value,
            allowedType: this.acceptType.filter((_, i) => this.allowedType.controls[i].value).map((i) => i.mime),
        });
    }
}

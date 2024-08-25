import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, UntypedFormArray, Validators } from '@angular/forms';

import { AcceptType } from '@models';

@Component({
    selector: 'sonaleela-document-request-form',
    templateUrl: './document-request-form.component.html',
    styles: [`:host {display: block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentRequestFormComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);

    @Input() isPending: boolean | null = false;
    @Input() error: string | null = '';

    @Output() submitForm = new EventEmitter<(typeof this.form.value)>();
    @Output() cancel = new EventEmitter<boolean>();

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

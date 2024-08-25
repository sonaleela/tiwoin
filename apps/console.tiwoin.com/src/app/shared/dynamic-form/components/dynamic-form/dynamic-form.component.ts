import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormBuilder, FormArray } from "@angular/forms";
import { FormFieldTypeEnum, FormModal } from '@models';

@Component({
  selector: 'sonaleela-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: [`:host { @apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);

  private _data: any = null;
  @Input() set data(data: any | null) {
    if (!data) return;
    this._data = data;

    data?.fields.forEach((field: any) => {
      this.getFields.push(this.formBuilder.control(''));
    });

    this.form.patchValue(data);
  }
  get data() { return this._data; }

  form = this.formBuilder.group({
    id: '',
    name: '',
    fields: this.formBuilder.array([])
  });

  get getFields() {
    return this.form.get('fields') as FormArray;
  }

  submit() { }
}

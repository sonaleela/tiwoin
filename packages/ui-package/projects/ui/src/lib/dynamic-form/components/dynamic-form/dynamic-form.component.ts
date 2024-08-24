import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: 'slui-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: [`:host { @apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {
  private _data: any = null;
  @Input() set data(data: any | null) {
    if (!data) return;
    this._data = data;

    data?.fields.forEach((field: any) => {
      this.getFields.push(this.fb.control(''));
    });

    this.form.patchValue(data);
  }
  get data() { return this._data; }

  form: FormGroup;

  get getFields() {
    return this.form.get('fields') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: '',
      name: '',
      fields: this.fb.array([])
    });
  }

  submit() {
  }
}

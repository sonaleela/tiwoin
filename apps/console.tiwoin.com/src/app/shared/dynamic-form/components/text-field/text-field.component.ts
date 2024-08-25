import { ChangeDetectionStrategy, Component, forwardRef, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormFieldTypeEnum, TextFieldModal } from '@models';
import { Subject, Subscription } from 'rxjs';
import { DynamicField } from '../field';

@Component({
  selector: 'sonaleela-text-field',
  templateUrl: './text-field.component.html',
  styles: [`:host { @apply flex flex-col gap-1;}`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent implements DynamicField {
  private formBuilder: FormBuilder = inject(FormBuilder);

  private _data: any;
  @Input() set data(data: any) {
    if (!data) return;
    this._data = data;

    this.control.patchValue(data?.value || '');
  }
  get data() { return this._data; }

  valueChange: Subject<any> = new Subject();

  control = this.formBuilder.control('')
  subscriptions: any[] = [];

  constructor() {
    const subscription = this.control.valueChanges.subscribe(value => {
      this.valueChange.next({
        ...this.data,
        value
      })
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}

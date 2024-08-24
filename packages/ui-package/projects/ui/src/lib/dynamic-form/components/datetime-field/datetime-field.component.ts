import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { DynamicField } from '../field';

@Component({
  selector: 'slui-datetime-field',
  templateUrl: './datetime-field.component.html',
  styles: [`:host { @apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimeFieldComponent implements DynamicField {
  private _data: any;
  @Input() set data(data: any) {
    if (!data) return;
    this._data = data;

    this.control.patchValue(data?.value || '');
  }
  get data() { return this._data; }

  valueChange: Subject<any> = new Subject();

  control: FormControl;
  subscriptions: any[] = [];

  constructor(private fb: FormBuilder) {
    this.control = this.fb.control('');

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

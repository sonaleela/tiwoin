import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { FormFieldTypeEnum } from '@models';
import { Subject, Subscription } from 'rxjs';
import { DynamicField } from "../field";

@Component({
  selector: 'sonaleela-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styles: [`:host { @apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxFieldComponent implements DynamicField, OnDestroy {
  private formBuilder: FormBuilder = inject(FormBuilder);

  private _data: any;
  @Input() set data(data: any) {
    if (!data) return;
    this._data = data;
    data.controls.forEach((control: { label: 'Canada', description: '', value: 'Canada', checked: false }) => {
      this.controlsArray.push(this.formBuilder.control(control.checked || false));
    });
  }
  get data() { return this._data; }

  valueChange: Subject<any> = new Subject();

  controlsArray = this.formBuilder.array([])
  subscriptions: any[] = [];

  constructor() {
    const subscription = this.controlsArray.valueChanges.subscribe(val => {
      const value = this.data.controls.filter((control: any, i: any) => !!val[i]);
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

import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormFieldTypeEnum } from '@models';
import { Subject, Subscription } from 'rxjs';
import { DynamicField } from '../field';

@Component({
  selector: 'sonaleela-file-field',
  templateUrl: './file-field.component.html',
  styles: [`:host {@apply block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFieldComponent implements DynamicField {
  private formBuilder: FormBuilder = inject(FormBuilder);

  private _data: any;
  @Input() set data(data: any) {
    if (!data) return;
    this._data = data;

    this.control.patchValue(data?.value || '');
  }
  get data() { return this._data; }

  valueChange: Subject<File | any> = new Subject();

  control = this.formBuilder.control<any>(null);
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

  changeFile(file: Event) {
    const files = (<HTMLInputElement>file?.target)?.files;
    if (files?.length) this.control.setValue(files[0]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
